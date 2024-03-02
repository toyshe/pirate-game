import { useEffect, useState } from "react"
import { getAvatar } from "../Utils/utils"
import { useParams } from "react-router-dom"
export default function LobbyPage(){

    const {room_code} = useParams()
    const [avatars, setAvatars] = useState([])
    const [chosenAvatar, setChosenAvatar] = useState(null)

    useEffect(() => {
        getAvatar().then(({Avatars}) => {
            console.log(Avatars);
            setAvatars(() => [Avatars])
        })
    }, [])

    return <>
        <h1>{room_code}</h1>
        {avatars.map((avatar) => {
            console.log(avatar);
            <img src={avatar}/>
        })}
    </>
}