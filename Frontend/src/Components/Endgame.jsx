import { useContext } from "react";
import { UsersContext } from "../Contexts/UsersContext";

export default function EndGame({ maxName }) {
    const { usersArr } = useContext(UsersContext)


    return (
        <>
            {usersArr.map((user) => {
                if (user.isSaboteur) {
                    { return maxName.length === 1 && maxName[0] === user.username ? <p>The crew made is home safely</p> : <p>The crew never made it back to port...</p> }
                }
            })}

            {usersArr.map((user) => {
                if (user.isSaboteur) {
                    return <p>The saboteur was {user.username}</p>

                }
            })}

        </>
    )
}