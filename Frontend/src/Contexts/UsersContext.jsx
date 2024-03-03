import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import socket from "../Utils/socket";

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
  const [usersArr, setUsersArr] = useState([])

  const updateUsersArr = (users) => {
    const newArr = users.map((user) => ({
      username: user,
      avatarUrl: null,
      isSaboteur: false,
    }));
    setUsersArr(newArr); // Set the state directly to the new array
  };

  useEffect(() => {
    function fetchUsers({ users, room }) {
      setUsersArr(prevUsers => {
        const newArr = users.map(user => ({
          username: user,
          avatarUrl: null,
          isSaboteur: false,
        }));
        return [...prevUsers, ...newArr];
      });
    }
    socket.on("be_users_list", fetchUsers)

    return () => {
      socket.off("be_users_list", fetchUsers)

    }
  }, [])


  return (
    <UsersContext.Provider value={{ usersArr, setUsersArr, updateUsersArr }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => useContext(UsersContext)