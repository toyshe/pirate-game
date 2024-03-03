import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useState, useEffect } from "react";
import socket from "../Utils/socket";
import { useNavigate } from "react-router-dom"
import { UsersContext } from "../Contexts/UsersContext";

export default function JoinRoom() {
    const navigate = useNavigate()
    const { userInfo } = useContext(UserContext)
    const { usersArr, updateUsersArr } = useContext(UsersContext)

    const [roomsArr, setRoomsArr] = useState([])

    const [joinClick, setJoinClick] = useState(false)

    const [loading, setLoading] = useState(false)


    useEffect(() => {

        function list_existing_rooms({ rooms }) {
            setRoomsArr(() => Object.keys(rooms))

            setLoading(false)
        }

        function join_room(data) {
            socket.emit("fe_users_list", { room: data.rooms })
            console.log(data, '<<join room');
            navigate(`/rooms/${data.rooms}`)
        }

        function create_room(data) {
            if (data.name === userInfo.username) {
                navigate(`/rooms/${data.room}`);
            }
        }

        socket.on("be_list_existing_rooms", list_existing_rooms)
        socket.on("be_join_room", join_room)
        socket.on("be_create_room", create_room)

        return () => {
            socket.off("be_list_existing_rooms", list_existing_rooms)
            socket.off("be_join_room", join_room)
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

    }

    const handleCreate = (event) => {
        event.preventDefault()
        socket.emit("fe_create_room", { username: userInfo.username })
    }

    return (<>
        <button onClick={handleJoin}>Join Room</button>
        <button onClick={handleCreate}>Create Room</button>
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