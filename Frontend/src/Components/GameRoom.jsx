import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../Contexts/UsersContext";
import { UserContext } from "../Contexts/UserContext";
import PlayerRole from "./PlayerRole";
import RoundPage from "./RoundPage";
import CanvasTestPage from "./CanvasTestPage";
import { LivesContext } from "../Contexts/LivesContext";
import ChatBox from "./ChatBox";
import VotesPage from "./VotesPage";

function GameRoom() {
    const navigate = useNavigate();
    //   const teamLives = useContext(LivesContext);

    const [showPlayerDesignation, setShowPlayerDesignation] = useState(true);
    const [showRoundPage, setShowRoundPage] = useState(false);
    const [showCanvasTestPage, setShowCanvasTestPage] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [drawTurn, setDrawTurn] = useState(0);
    const [guessTurn, setGuessTurn] = useState(1);
    const [isDrawer, setIsDrawer] = useState();
    const [isGuesser, setIsGuesser] = useState();
    const [teamLose, setTeamLose] = useState(false);
    const [round, setRound] = useState(0);
    const { usersArr } = useContext(UsersContext)
    const { userInfo } = useContext(UserContext)
    const {lives} = useContext(LivesContext)

    const pickTurn = () => {
        setDrawTurn((prevTurn) => prevTurn + 1);
        setGuessTurn((prevTurn) => prevTurn + 1);
        if (drawTurn === usersArr.flat().length - 1) {
            setDrawTurn(0);
        }
        const currentDraw = usersArr[drawTurn];
        setIsDrawer(currentDraw);
        currentDraw.username === userInfo.username ? (userInfo.draw = true) : (userInfo.draw = false);
        if (guessTurn === usersArr.flat().length - 1) {
            setGuessTurn(0);
        }
        const currentGuess = usersArr[guessTurn];
        setIsGuesser(currentGuess);
        currentGuess.username === userInfo.username ? (userInfo.guess = true) : (userInfo.guess = false);

        console.log(userInfo);
    };

    let playerDesignationLength = 5000;
    let roundLength = 30000;
    let roundBreakLength = 5000;
    let numberOfRounds = 5;

    useEffect(() => {
        const playerDesignationTimer = setTimeout(() => {
            setShowPlayerDesignation(false);
            setShowRoundPage(true);
        }, playerDesignationLength);

        return () => clearTimeout(playerDesignationTimer);
    }, []);

    useEffect(() => {
        if (showRoundPage) {
            pickTurn()
            if (round + 1 > numberOfRounds) {
                setGameOver(true)
            }
            else {
                const roundPageTimer = setTimeout(() => {
                    setShowRoundPage(false);
                    setShowCanvasTestPage(true);
                }, roundBreakLength);

                return () => clearTimeout(roundPageTimer);
            }
        }
    }, [showRoundPage])

    useEffect(() => {
        if (showCanvasTestPage) {
            const canvasTestPageTimer = setTimeout(() => {
                setShowCanvasTestPage(false);
                setShowRoundPage(true);
            }, roundLength);

            return () => clearTimeout(canvasTestPageTimer);
        }
    }, [showCanvasTestPage]);

    useEffect(() => {
        if(lives < 1){
            setGameOver(true)
            setTeamLose(true)
        }
    })

    return (
        <div>
            <h2>Lives: {lives}</h2>
            {!gameOver && !teamLose && (
                <div>
                    {showPlayerDesignation && <PlayerRole />}
                    {showRoundPage && <RoundPage round={round} setRound={setRound} />}
                    {showCanvasTestPage && (
                        <CanvasTestPage timerCountdownSeconds={roundLength / 1000} isDrawer={isDrawer} isGuesser={isGuesser} />
                    )}
                </div>
            )}
            {teamLose && gameOver && <VotesPage />}
            <ChatBox />
        </div>
    )

    //   let playerDesignationLength = 5000;
    //   let roundLength = 30000;
    //   let roundBreakLength = 5000;
    //   let numberOfRounds = 5;

    //   useEffect(() => {
    //     const playerDesignationTimer = setTimeout(() => {
    //       setShowPlayerDesignation(false);
    //       setShowRoundPage(true);
    //     }, playerDesignationLength);

    //     return () => clearTimeout(playerDesignationTimer);
    //   }, []);

    //   useEffect(() => {
    //     if (showRoundPage) {
    //       pickTurn();
    //       if (round + 1 > numberOfRounds) setGameOver(true);
    //       else {
    //         const roundPageTimer = setTimeout(() => {
    //           setShowRoundPage(false);
    //           setShowCanvasTestPage(true);
    //         }, roundBreakLength);

    //         return () => clearTimeout(roundPageTimer);
    //       }
    //     }
    //   }, [showRoundPage]);

    //   useEffect(() => {
    //     if (showCanvasTestPage) {
    //       const canvasTestPageTimer = setTimeout(() => {
    //         setShowCanvasTestPage(false);
    //         setShowRoundPage(true);
    //       }, roundLength);

    //       return () => clearTimeout(canvasTestPageTimer);
    //     }
    //   }, [showCanvasTestPage]);

    //   useEffect(() => {
    //     if (teamLives.lives < 1) {
    //       setGameOver(true);
    //       setTeamLose(true);
    //     }
    //   }, [teamLives]);

    //   return (
    //     <div>
    //       <h2>Lives: {teamLives.lives}</h2>
    //       {!gameOver && !teamLose && (
    //         <div>
    //           {showPlayerDesignation && <PlayerDesignation />}
    //           {showRoundPage && <RoundPage round={round} setRound={setRound} />}
    //           {showCanvasTestPage && (
    //             <CanvasTestPage
    //               timerCountdownSeconds={roundLength / 1000}
    //               users={users}
    //               setUsers={setUsers}
    //               isDrawer={isDrawer}
    //               isGuesser={isGuesser}
    //             />
    //           )}
    //         </div>
    //       )}
    //       {!teamLose && gameOver && <VotePage playerList={users.playerList} />}
    //       {teamLose && (
    //         <EndGamePage playerList={users.playerList} resultsVisible={true} />
    //       )}
    //       <ChatWindow />
    //     </div>
    //   );
}

export default GameRoom;