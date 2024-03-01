import { useContext, useState } from "react"
import UserContext from "../Contexts/UserContext"

export default function StoryPage() {

    const [usernameInput, setUsernameInput] = useState('')

    const {userInfo} = useContext(UserContext)

    const handleSubmit = (event) => {
        userInfo.username = usernameInput
        event.preventDefault()
        console.log(userInfo);
    }

    const handleJoin = () => {
        //display the list of the room
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