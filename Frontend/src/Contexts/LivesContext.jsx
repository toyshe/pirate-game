import { createContext, useState } from "react";

export const LivesContext = createContext()

export const LivesProvider = ({children}) => {
    const [lives, setLives] = useState(3)

    return (
        <LivesContext.Provider value={{lives, setLives}}>
            {children}
        </LivesContext.Provider>
    )
}