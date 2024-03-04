import { useState } from "react";
import { TfiFaceSad } from "react-icons/tfi";
import EndGame from "./Endgame";

export default function WakThePlank({ votesCount }) {
    console.log(votesCount);

    let maxVotes = -1
    let maxName = []

    const [isOpen, setIsOpen] = useState(false)

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

    function handleEndGame(){
        setIsOpen(true)
    }

    return (
        <div>
            {maxName.length === 1 ?
                <div className="parent">
                    <img
                        src={"https://i.postimg.cc/VLvqszmD/scroll2.png"}
                        className="title-scroll"
                    />
                    <div className="scroll-child">
                        <h2>
                            {maxName[0]}
                            <br />
                            must walk the plank...
                        </h2>
                    </div>
                </div>
                : <div>
                    <div className="parent">
                        <img
                            src={"https://i.postimg.cc/VLvqszmD/scroll2.png"}
                            className="title-scroll"
                        />
                        <div className="scroll-child">
                            <h2>
                                No one was thrown overboard! The imposter survives!
                                <TfiFaceSad />
                            </h2>
                        </div>
                    </div>
                </div>}

            <button onClick={handleEndGame}>Reveal Results</button>
            {isOpen && <EndGame maxName={maxName} />}
        </div>
    )
}