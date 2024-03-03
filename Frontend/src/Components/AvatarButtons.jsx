import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext";
import { UsersContext } from "../Contexts/UsersContext";
import socket from "../Utils/socket";

export default function AvatarButton({ avatar, chosenAvatar, setChosenAvatar }) {

    const { setUserInfo, userInfo } = useContext(UserContext)
    const { setUsersArr, usersArr } = useContext(UsersContext)

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
        socket.emit("fe_avatar_select", {username: userInfo.username, avatarUrl: userInfo.avatarUrl})
    }

    useEffect(() => {

        function choseAvatar({ username, avatarUrl }) {
            setUsersArr((currentUsers) =>
                currentUsers.map((user) =>
                    user.username === username ? { ...user, avatarUrl } : user
                )
            );
        }
        socket.on("be_avatar_select", choseAvatar)

        return () => {
            socket.off("be_avatar_select", choseAvatar)
        }
    })


    return (
        <img
            className={chosenAvatar === avatar ? "avatar-clicked" : "avatar"}
            src={avatar}
            alt="pirate avatar"
            onClick={() => handleAvatarClick(avatar)}
        />
    );
}