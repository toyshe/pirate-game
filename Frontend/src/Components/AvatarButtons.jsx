import { useState } from "react"

export default function AvatarButton({ avatar, chosenAvatar, setChosenAvatar }) {

    function handleAvatarClick(avatar) {
        setChosenAvatar(avatar);
        // setUser((currentUser) => ({
        //     ...currentUser,
        //     avatarURL: avatar,
        // }));
        // setUsersArray((currentUsersArray) =>
        //     currentUsersArray.map((player) =>
        //         player.username === user.username
        //             ? { ...player, avatarURL: avatar }
        //             : player
        //     )
        // );

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