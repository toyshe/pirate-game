import { useContext, useEffect, useState } from "react"
import UserContext from "../Contexts/UserContext"
import socket from "../Utils/socket"

export default function StoryPage() {

    const [usernameInput, setUsernameInput] = useState('')

    const { userInfo } = useContext(UserContext)

    const [roomsArr, setRoomsArr] = useState([])
    const [showButtons, setShowButtons] = useState(false)
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
    
    
    const handleSubmit = (event) => {
        setShowButtons(true)
        userInfo.username = usernameInput
        event.preventDefault()
        console.log(userInfo);
    }

    const handleClick = () => {
        //create a new room
        //navigate to the rooms page
    }

    const handleJoinRoom = (event) => {
        event.preventDefault()
        socket.emit("fe_join_room", { username: userInfo.username, room: event.target.value })

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                </label>
                <input id="username" value={usernameInput} type="text" placeholder="Enter username..." onChange={(event) => { setUsernameInput(event.target.value) }} />
                {showButtons ? <>

                    <button onClick={handleJoin} >
                        Join Room
                    </button>
                    <button onClick={handleClick}>
                        Create Room
                    </button>
                </> : null}
                <div className="roomsList">
                    {joinClick ? roomsArr.map((room) => {return <button value={room} onClick={handleJoinRoom}>{room}</button>}) : null}
                </div>
            </form>
        </>
    )
}