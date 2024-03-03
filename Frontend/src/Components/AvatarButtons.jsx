import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext";
import { UsersContext } from "../Contexts/UsersContext";

export default function AvatarButton({ avatar, chosenAvatar, setChosenAvatar }) {

    const {setUserInfo, userInfo} = useContext(UserContext)
    const {setUsersArr, usersArr} = useContext(UsersContext)

    function handleAvatarClick(avatar) {
        setChosenAvatar(avatar);
        setUserInfo((currentUser) => ({
            ...currentUser,
            avatarUrl: avatar,
        }));
        setUsersArr((currentUsersArray) =>
            currentUsersArray.flat().map((player) =>
                player.username === userInfo.username
                    ? { ...player, avatarUrl: avatar }
                    : player
            )
        );
        socket.emit("fe_avatar_select")
        console.log(usersArr);

    }

    return (
        <img
            className={chosenAvatar === avatar ? "avatar-clicked" : "avatar"}
            src={avatar}
            alt="pirate avatar"
            onClick={() => handleAvatarClick(avatar)}
        />
    );
}