import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getPictionaryPrompts } from "../Utils/utils";
import Canvas from "./Canvas";
import socket from "../Utils/socket";

export default function CanvasTestPage({ timerCountdownSeconds, isDrawer, isGuesser }) {
    const { userInfo, setUserInfo } = useContext(UserContext)

    const [picturePrompts, setPicturePrompts] = useState([])
    const [wordPrompt, setWordPrompt] = useState(null)
    const [promptSent, setPromptSent] = useState(false)

    useEffect(() => {
        getPictionaryPrompts().then(({ PictionaryPrompts }) => {
            setPicturePrompts(PictionaryPrompts)
        })

        socket.on("be_random_prompt", sendPrompt)

        return () => {
            socket.off("be_random_prompt", sendPrompt)
        }
    }, [])

    function sendPrompt({ prompt }) {
        console.log(prompt);
        setWordPrompt(prompt)
    }

    function getRandomPrompt() {
        const randomIndex = Math.floor(Math.random() * picturePrompts.length)
        console.log(picturePrompts[randomIndex]);
        return picturePrompts[randomIndex]
    }

    if (userInfo.draw && !promptSent && picturePrompts.length > 0) {
        const randomPrompt = getRandomPrompt();
        console.log(randomPrompt);
        socket.emit("fe_random_prompt", { prompt: randomPrompt });
        setPromptSent(true);
    }

    return (
        <div className="canvas-container">
            {<Canvas timerCountdownSeconds={timerCountdownSeconds} randomPrompt={wordPrompt} isDrawer={isDrawer} isGuesser={isGuesser} />}
        </div>
    )
}