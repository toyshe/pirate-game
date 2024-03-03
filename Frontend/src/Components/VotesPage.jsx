import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Contexts/UsersContext";
import socket from "../Utils/socket";
import Timer from "./Timer";
import WakThePlank from "./WalkThePlank";

export default function VotesPage(){
    let timerCountdownSeconds = 30
    const {usersArr, setUsersArr} = useContext(UsersContext)
    const [votingComplete, setVotingComplete] = useState(false)
    const [timerCompleted, setTimerCompleted] = useState(false)
    const [votesCount, setVoteCount] = useState({})

    const handleVote = (user) => {
        setVoteCount({})
        socket.emit("fe_votes", {username: user.username})
        setVotingComplete(true)
    }

    const handleTimeUp = () => {
        setTimerCompleted(true)
    }

    function handleVoteCount({ votes }) {
        setVoteCount((prevVotes) => {
            const updatedVotes = { ...prevVotes }; // Create a copy of previous votes
            Object.keys(votes).forEach((user) => {
                usersArr.forEach((userDetails) => {
                    if (userDetails.username === user) {
                        updatedVotes[user] = votes[user]; // Update the vote count
                    }
                });
            });
            return updatedVotes; // Return the updated votes object
        });
    } 

    useEffect(() => {
        socket.on("be_votes", handleVoteCount)

        return () => {
            socket.off("be_votes", handleVoteCount)
        }
    }, [])

    return (
        <div>
            {!timerCompleted ? (<>
            <h2>Hunt down the traitor!</h2>
            <Timer timerCountdownSeconds={timerCountdownSeconds} onTimeUp={handleTimeUp} />
            {usersArr.map((user, index) => {
                console.log(user);
                return <div key={index}>
                    <div>{user.username}</div>
                    <button onClick={() => handleVote(user)} disabled={votingComplete}>Vote {user.username}</button>
                </div>
            })}
    </>) : <WakThePlank votesCount={votesCount} />}
        </div>
    )
}