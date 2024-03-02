import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useState, useEffect } from "react";
import socket from "../Utils/socket";
import { useNavigate } from "react-router-dom"

export default function JoinRoom() {
    const navigate = useNavigate()
    const { userInfo } = useContext(UserContext)

    const [roomsArr, setRoomsArr] = useState([])

    const [joinClick, setJoinClick] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        function list_existing_rooms({ rooms }) {
            setRoomsArr(() => Object.keys(rooms))
            console.log(roomsArr);
            setLoading(false)
        }

        function join_room(data) {
            console.log(data);
        }

        function fetchUsers(data){
            console.log(data);
        }

        socket.on("be_list_existing_rooms", list_existing_rooms)
        socket.on("be_join_room", join_room)
        socket.on("be_users_list", fetchUsers)

        return () => {
            socket.off("be_list_existing_rooms", list_existing_rooms)
            socket.off("be_join_room", join_room)
            socket.off("be_users_list", fetchUsers)
        }
    }, [])


    const handleJoin = () => {
        setJoinClick(true)
        setLoading(true)
        socket.emit("fe_list_existing_rooms")
    }

    const handleJoinRoom = (event) => {
        event.preventDefault()
        socket.emit("fe_join_room", { username: userInfo.username, room: event.target.value })
        socket.emit("fe_users_list", {room: event.target.value})
        // navigate(`/rooms/${event.target.value}`)
    }

    return (<>
        <button onClick={handleJoin}>Join Room</button>
        <button>Create Room</button>
        {joinClick && loading ? (
            <p>Loading...</p>
        ) : joinClick && roomsArr.length === 0 ? (
            <p>No rooms available</p>
        ) : (

            roomsArr.map((room) => (

                <button key={room} value={room} onClick={handleJoinRoom}>
                    {room}
                </button>
            ))
        )}
    </>)
}