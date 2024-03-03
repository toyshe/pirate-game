import { useContext, useState } from "react";
import { UsersContext } from "../Contexts/UsersContext";
import socket from "../Utils/socket";

export default function VotesPage(){
    const {usersArr} = useContext(UsersContext)
    const [votingComplete, setVotingComplete] = useState(false)

    const handleVote = (user) => {
        usersArr.map((currentUser) => {
            if(currentUser.username === user.username){
                currentUser.votes = 1
                socket.on("fe_votes", {username: user.username, votes: 1})
            }
        })
        setVotingComplete(true)
    }

    return (
        <div>
            {usersArr.map((user, index) => {
                console.log(user);
                return <div key={index}>
                    <div>{user.username}</div>
                    <button onClick={() => handleVote(user)} disabled={votingComplete}>Vote {user.username}</button>
                </div>
            })}
        </div>
    )
}