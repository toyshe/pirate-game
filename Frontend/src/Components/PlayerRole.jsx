import { useContext } from "react";
import { UsersContext } from "../Contexts/UsersContext";
import { UserContext } from "../Contexts/UserContext";

export default function PlayerRole() {
    const { userInfo } = useContext(UserContext)
    const {usersArr} = useContext(UsersContext)

    return (
        <>
            <main>
                <h1 className="player-title">You are...</h1>
                <div className="parent">
                    <img src={"../../images/scroll2.png"} className="title-scroll" />
                    <div className="scroll-child">
                        {console.log(userInfo, '<<<userInfo')}
                        {console.log(usersArr, '<<usersArr')}
                        {userInfo.isSaboteur && (
                            <><h1>The Siren's Thrall</h1>
                                <p> Sink the ship </p>
                            </>)}
                        {!userInfo.isSaboteur && (
                            <>
                                <h1> Part of the crew</h1>
                                <p>Find the Thrall</p>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </>
    )

}