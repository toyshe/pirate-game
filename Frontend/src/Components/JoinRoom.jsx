import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { useState, useEffect } from "react";
import socket from "../Utils/socket";
import { useNavigate } from "react-router-dom"

export default function JoinRoom() {
    const navigate = useNavigate()
    const { userInfo } = useContext(UserContext)

    const [roomsArr, setRoomsArr] = useState([])

    const [joinClick, setJoinClick] = useState(false)

    useEffect(() => {

        function list_existing_rooms({ rooms }) {
            setRoomsArr(() => [Object.keys(rooms)])
            console.log(roomsArr);
        }

        function join_room(data) {
            console.log(data);
        }

        socket.on("be_list_existing_rooms", list_existing_rooms)
        socket.on("be_join_room", join_room)

        return () => {
            socket.off("be_list_existing_rooms", list_existing_rooms)
            socket.off("be_join_room", join_room)
        }
    }, [])


    const handleJoin = () => {
        setJoinClick(true)
        //display the list of the room
        socket.emit("fe_list_existing_rooms")
        console.log(roomsArr);
        //add member to the new room
        //navigate to the rooms page

    }

    const handleJoinRoom = (event) => {
        event.preventDefault()
        socket.emit("fe_join_room", { username: userInfo.username, room: event.target.value })
        navigate(`/rooms/${event.target.value}`)
    }

    return (<>
        <button onClick={handleJoin}>Join Room</button>
        <button>Create Room</button>
        {joinClick && roomsArr.length !== 0 ? roomsArr.map((room) => { return <button key={room} value={room} onClick={handleJoinRoom}>{room}</button> }) : <p>No rooms available</p>}

    </>)
}