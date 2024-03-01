import { useContext, useEffect, useState } from "react"
import UserContext from "../Contexts/UserContext"
import socket from "../Utils/socket"

export default function StoryPage() {

    const [usernameInput, setUsernameInput] = useState('')

    const {userInfo} = useContext(UserContext)

    const [roomsArr, setRoomsArr] = useState([])

    useEffect(() => {

        function list_existing_rooms({rooms}){
            console.log('in here');
            console.log(rooms);
        }

        socket.on("be_list_existing_rooms", list_existing_rooms)

        return () => {
            socket.off("be_list_existing_rooms", list_existing_rooms)
        }
    }, [])

    const handleSubmit = (event) => {
        userInfo.username = usernameInput
        event.preventDefault()
        console.log(userInfo);
    }

    const handleJoin = () => {
        //display the list of the room
        socket.emit("fe_list_existing_rooms")
        //navigate to the rooms page

    }

    const handleClick = () => {
        //create a new room
        //navigate to the rooms page
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                Username:
            </label>
            <input id="username" value={usernameInput} type="text" placeholder="Enter username..." onChange={(event) => {setUsernameInput(event.target.value)}} />
        </form>
        <button onClick={handleJoin}>
            Join Room
        </button>
        <button onClick={handleClick}>
            Create Room
        </button>
        </>
    )
}