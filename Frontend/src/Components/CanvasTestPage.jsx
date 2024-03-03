import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { getPictionaryPrompts } from "../Utils/utils";
import Canvas from "./Canvas";

export default function CanvasTestPage({timerCountdownSeconds, isDrawer, isGuesser}){
    const {userInfo, setUserInfo} = useContext(UserContext)

    const [picturePrompts, setPicturePrompts] = useState([])
    let randomPrompt

    useEffect(() => {
        getPictionaryPrompts().then(({PictionaryPrompts}) => {
            setPicturePrompts(PictionaryPrompts)
        })
    }, [])

    function getRandomPrompt(){
        const randomIndex = Math.floor(Math.random() * picturePrompts.length)
        return picturePrompts[randomIndex]
    }

    if(userInfo.draw){
        randomPrompt = getRandomPrompt()
        socket.emit("fe_random_prompt", {prompt: randomPrompt})
    }
    console.log(randomPrompt);

    return (
        <div className="canvas-container">
            <Canvas timerCountdownSeconds={timerCountdownSeconds} randomPrompt={randomPrompt} isDrawer={isDrawer} isGuesser={isGuesser} />
        </div>
    )
}