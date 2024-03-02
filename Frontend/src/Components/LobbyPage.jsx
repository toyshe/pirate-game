import { useEffect } from "react"
import { getAvatar } from "../Utils/utils"
import { useParams } from "react-router-dom"
export default function LobbyPage(){

    const {room_code} = useParams()

    useEffect(() => {
        getAvatar().then((data) => {
            console.log(data);
        })
    }, [])

    return <h1>{room_code}</h1>
}