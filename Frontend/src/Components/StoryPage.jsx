import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function StoryPage() {

    const [usernameInput, setUsernameInput] = useState('')

    const { userInfo } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        userInfo.username = usernameInput
        console.log(userInfo.username);
        console.log(userInfo);
        navigate('/rooms')
    }

    // const handleClick = () => {
    //     navigate('/rooms')
    // }


    return (
        <div className="container">
            <div className="parent">
                <img src={"../../images/scroll.png"} className="story-scroll" />
                <div className="child">
                    <p>
                        An infamous crew of fearsome pirates sail the seven seas, plundering
                        and pillaging all in their wake.
                        <br />
                        <br />
                        Unbeknownst to the rest of the crew, one of the pirates is seduced
                        by The Siren, who longs to bring the ship to its watery demise.
                        <br />
                        <br />
                        Will the crew make it to land, or will they be united with The Siren
                        for all eternity?
                    </p>
                </div>
            </div>
            <form>
                <label htmlFor="username">
                    Username:
                </label>
                <input id="username" value={usernameInput} type="text" placeholder="Enter username..." onChange={(event) => { setUsernameInput(event.target.value) }} />
                <button onClick={handleSubmit}>Continue</button>
                {/* <button>Continue</button> */}
                {/* {showButtons ? <>

                    <button onClick={handleJoin} >
                        Join Room
                    </button>
                    <button onClick={handleClick}>
                        Create Room
                    </button>
                </> : null}
                <div className="roomsList">
                    {joinClick ? roomsArr.map((room) => { return <button key={room} value={room} onClick={handleJoinRoom}>{room}</button> }) : null}
                </div> */}
            </form>
        </div>
    )
}