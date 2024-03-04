import { useContext, useState } from "react";
import { TfiFaceSad } from "react-icons/tfi";
import EndGame from "./Endgame";
import { UsersContext } from "../Contexts/UsersContext";

export default function WakThePlank({ votesCount }) {
    console.log(votesCount);

    let maxVotes = -1
    let maxName = []

    const [isOpen, setIsOpen] = useState(false)

    const {usersArr} = useContext(UsersContext)

    for (const key in votesCount) {
        if (votesCount[key] > maxVotes) {
            maxVotes = votesCount[key]
            maxName.pop()
            maxName.push(key)
        }
        else if (votesCount[key] === maxVotes) {
            maxName.push(key)
        }
    }

    function handleEndGame() {
        setIsOpen(true)
    }

    return (
        <div>
            {!isOpen && maxName.length === 1 ? (
                <div className="parent">
                    <img src={"https://i.postimg.cc/VLvqszmD/scroll2.png"} className="title-scroll" />
                    <div className="walk-plank">
                        <h2>{maxName[0]}<br />must walk the plank...</h2>
                    </div>
                </div>
            ) : (
                <div className="parent">
                    <img src={"https://i.postimg.cc/VLvqszmD/scroll2.png"} className="title-scroll" />
                    <div className="scroll-child">
                        <h2>No one was thrown overboard! The imposter survives!<TfiFaceSad /></h2>
                    </div>
                </div>
            )}

            {(
                <button className="reveal-results" onClick={handleEndGame}>
                    Reveal Results
                </button>
            )}

            {!isOpen && <div>
                {usersArr.map((user) => {
                    if (user.isSaboteur) {
                        return <h1>The saboteur was {user.username}</h1>
                    }
                })}
                <div>
                    {usersArr.map((user) => {
                        if (user.isSaboteur) {
                            { return maxName.length === 1 && maxName[0] === user.username ? <h1>The crew made it home safely</h1> : <h1>The crew never made it back to port...</h1> }
                        }
                    })}
                </div>


                <button onClick={() => { naviagte("/story") }}>Return to port</button>
            </div>}
        </div>
    );
}