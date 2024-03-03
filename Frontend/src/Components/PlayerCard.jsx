import { FaRegUserCircle } from "react-icons/fa";
export default function PlayerCard({player}){
    return(
        <div className="player-card">
            {player.avatarUrl ? (<img className="selected-avatar" width="80" src={player.avatarUrl}/>) : (<FaRegUserCircle />)}
            <h3>{player.username}</h3>
        </div>
    )
}