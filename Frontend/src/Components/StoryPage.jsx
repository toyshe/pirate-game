import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function StoryPage() {

    const [usernameInput, setUsernameInput] = useState('')

    const { userInfo, setUserInfo } = useContext(UserContext)

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
                <img src={"https://i.postimg.cc/tR2dHsQs/scroll.png"} className="story-scroll" />
                <div className="child">
                    <p>
                        An infamous crew of frightful pirates sail the seven seas, pillaging
                        and wrecking all in their wake.
                        <br />
                        <br />
                        Unbeknownst to the rest of the crew, one of the pirate is seduced
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
            </form>
        </div>
    )
}