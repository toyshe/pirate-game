import { useContext, useEffect, useState, useRef } from "react"
import { UserContext } from "../Contexts/UserContext"
import socket from "../Utils/socket"

export default function Canvas({ timerCountdownSeconds, randomPrompt, isDrawer, isGuesser }) {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [drawingCommands, setDrawingCommands] = useState([])
    const [backgroundImage, setBackgroundImage] = useState(null)

    const [rotationAngle, setRotationAngle] = useState(0)

    const { userInfo } = useContext(UserContext)

    const [guessInput, setGuessInput] = useState('')

    const [win, setWin] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "black";
        context.lineWidth = 5; // if we want to change the width of the line
        context.lineCap = "round";
        context.lineJoin = "round";

        const img = new Image();
        img.src = "../images/gridPaper.png";
        img.onload = () => {
            setBackgroundImage(img);
        };
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.moveTo(offsetX, offsetY);
        context.beginPath();
        if (userInfo.draw) {
            setIsDrawing(true)
            socket.emit("fe_start_drawing", { offsetX, offsetY })
        }
    };

    const drawFE = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineTo(offsetX, offsetY);
        context.stroke();
        socket.emit("fe_draw", { offsetX, offsetY })
    };

    const finishDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            const canvas = canvasRef.current;
            setDrawingCommands([...drawingCommands, canvas.toDataURL()]);
            socket.emit("fe_finish_drawing", { drawingCommands })
        }
    };


    useEffect(() => {
        socket.on("be_start_drawing", ({ offsetX, offsetY }) => {
            if (!isDrawing) {

                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                context.moveTo(offsetX, offsetY);
                context.beginPath();
            }
        })

        socket.on("be_draw", ({ offsetX, offsetY }) => {
            if (!isDrawing) {
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                context.lineTo(offsetX, offsetY);
                context.stroke();
            }

        });

        socket.on("be_finish_drawing", ({ drawingCommands }) => {
            if (!isDrawing) {

                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                drawingCommands.forEach((command) => {
                    const img = new Image();
                    img.src = command;
                    img.onload = () => {
                        context.drawImage(img, 0, 0);
                    };
                });
            }
        });

        return () => {
            socket.off("be_start_drawing")
            socket.off("be_draw")
            socket.off("be_finish_drawing")
        }
    }, [canvasRef])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (backgroundImage) {
            context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        }

        drawingCommands.forEach((command) => {
            const img = new Image();
            img.src = command;
            img.onload = () => {
                context.drawImage(img, 0, 0);
            };
        });
    }, [drawingCommands, backgroundImage]);

    const handleReset = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        setDrawingCommands([]);
        setRotationAngle(0); // Reset rotation angle
    };

    // Function to handle the rotation animation
    const rotateCanvas = () => {
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const angle = (progress / 2000) * 360; // Rotate over 2 seconds
            setRotationAngle(angle);
            if (progress < 2000) {
                requestAnimationFrame(animate);
            } else {
                // Reset rotation angle to 0 after rotation completes
                setRotationAngle(0);
            }
        };
        requestAnimationFrame(animate);
    };

    function handleGuess(e) {
        e.preventDefault()
        console.log(randomPrompt);
        if (guessInput.toLowerCase() === randomPrompt.toLowerCase()) {
            setWin(true)
        }
        else {
            console.log('try again');
        }
    }

    return (
        <div>
            <h1>{isDrawer.username} is drawing ... : {isGuesser.username} is guessing ...</h1>
            {win && <h1>Correct Answer! Sail onto the next Round!</h1>}
            <canvas
                ref={canvasRef}
                width={1000}
                height={800}
                onMouseDown={startDrawing}
                onMouseMove={drawFE}
                onMouseUp={finishDrawing}
                onMouseOut={finishDrawing}
                style={{
                    backgroundColor: "white",
                    transform: `rotate(${rotationAngle}deg)`,
                    border: "7px solid red",
                }}
            />
            <div>
                {console.log(randomPrompt)}
                {randomPrompt !== null && (
                    <>
                        {userInfo.draw ? (

                            <h1 className="drawPrompt"> Draw a {randomPrompt}</h1>
                        ) : (
                            <h1>Guess the word ...</h1>
                        )}
                    </>)}
                {userInfo.draw && <button onClick={handleReset}>Reset</button>}
                {userInfo.guess && (
                    <form method="post">
                        <div>
                            <input type="text" placeholder="SwordBoat" name="guess" value={guessInput} onChange={(e) => { setGuessInput(e.target.value) }} />
                            <button onClick={handleGuess} type="submit" name="guess">Guess</button>
                        </div>
                    </form>
                )}
                {userInfo.isSaboteur && <button onClick={rotateCanvas}>Rotate</button>}
            </div>
        </div>
    );

}