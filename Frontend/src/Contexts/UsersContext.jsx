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
      votes: 0
    }));
    setUsersArr(newArr); // Set the state directly to the new array
  };

  useEffect(() => {
    function fetchUsers({ users, room }) {
      setUsersArr(prevUsers => {
        // Filter out existing users
        const filteredUsers = users.filter(user => !prevUsers.some(prevUser => prevUser.username === user));
        // Create new user objects for the filtered users
        const newArr = filteredUsers.map(user => ({
          username: user,
          avatarUrl: null,
          isSaboteur: false,
        }));
        // Concatenate the existing users with the new ones
        return [...prevUsers, ...newArr];
      });
    }
    socket.on("be_users_list", fetchUsers);

    return () => {
      socket.off("be_users_list", fetchUsers);
    }
  }, []);



  return (
    <UsersContext.Provider value={{ usersArr, setUsersArr, updateUsersArr }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => useContext(UsersContext)