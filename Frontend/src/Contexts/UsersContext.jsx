import { createContext } from "react";
import { useState } from "react";

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [usersArr, setUsersArr] = useState([])

    return (
        <UsersContext.Provider value={{ usersArr, setUsersArr }}>
            {children}
        </UsersContext.Provider>
    )
}