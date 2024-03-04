import { useContext } from "react";
import { UsersContext } from "../Contexts/UsersContext";
import { useNavigate } from "react-router-dom";

export default function EndGame({ maxName }) {
    const { usersArr } = useContext(UsersContext)
    const naviagte = useNavigate()

    return (
        <div>
                {usersArr.map((user) => {
                    if (user.isSaboteur) {
                        return <h1>The saboteur was {user.username}</h1>
                    }
                })}
                <div>
                {usersArr.map((user) => {
                    if (user.isSaboteur) {
                        { return maxName.length === 1 && maxName[0] === user.username ?  <h1>The crew made it home safely</h1> : <h1>The crew never made it back to port...</h1> }
                    }
                })}
                </div>


                <button onClick={() => { naviagte("/story") }}>Return to port</button>
            </div>
    )
}