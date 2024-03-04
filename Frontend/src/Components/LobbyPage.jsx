import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAvatar } from "../Utils/utils";
import AvatarButton from "./AvatarButtons";
import { UsersContext } from "../Contexts/UsersContext";
import { UserContext } from "../Contexts/UserContext";
import PlayerCard from "./PlayerCard";
import socket from "../Utils/socket";

export default function LobbyPage() {
  const minimumPlayers = 2;

  const navigate = useNavigate();
  const [chosenAvatar, setChosenAvatar] = useState(null);
  const { room_code } = useParams();
  const [avatars, setAvatars] = useState([]);
  const { usersArr, setUsersArr } = useContext(UsersContext)
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [saboteur, setSaboteur] = useState({})

  const totalPlayers = usersArr.flat().length

  useEffect(() => {
    getAvatar()
      .then((data) => {
        const { Avatars } = data;
        setAvatars(Avatars);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      });

      function onStart({ saboteur }) {
        console.log(saboteur);
        setUsersArr((currentUsers) => {
          const updatedUsers = currentUsers.map((user) =>
            user.username === saboteur
              ? { ...user, isSaboteur: true }
              : user
          );
          console.log(updatedUsers); // Check if the isSaboteur flag is set correctly
          return updatedUsers;
        });
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          isSaboteur: saboteur === userInfo.username,
        }));
        navigate(`/rooms/${room_code}/play`);
      }

    socket.on("be_start_game", onStart)

  }, [usersArr]);


  function handleStart() {
    const randomIndex = Math.floor(Math.random() * totalPlayers);
    const selectedSaboteur = usersArr[randomIndex]; 
    setSaboteur(selectedSaboteur); 
    socket.emit("fe_start_game", { saboteur: selectedSaboteur.username }); 
  }
  


  return (
    <>
      <main
        style={{
          // backgroundColor: "rgba(32, 178, 170, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.9)",
        }}
      >
        <h2 style={{ fontSize: "5vw" }}>{room_code}</h2>

        <PlayerCard key={userInfo.username} player={userInfo} />
        {usersArr.flat().map((user) => {
          if (user.username !== userInfo.username) {
            return <PlayerCard key={user.username} player={user} />
          }
        })}

        <div className="avatar-buttons">
          <h3 style={{ fontSize: "2vw" }}>Choose an avatar:</h3>

          {avatars.map((avatar, index) => {
            return (
              <AvatarButton
                key={index}
                avatar={avatar}
                chosenAvatar={chosenAvatar}
                setChosenAvatar={setChosenAvatar}
              />
            );
          })}
          <br />
        </div>
        <button onClick={handleStart} disabled={totalPlayers < minimumPlayers} >
          Start Game!
        </button>
      </main>
    </>
  );
}