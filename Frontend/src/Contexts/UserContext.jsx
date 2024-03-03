import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({ username: '', avatarUrl: null, isSaboteur: false })

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}