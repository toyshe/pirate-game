import '../App.css'
import { useEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import StoryPage from './StoryPage'
import socket from '../Utils/socket'

function App() {
  const [userInfo, setUserInfo] = useState({username: '', avatarUrl: null, isSaboteur: false})

    useEffect(() => {

        function onConnect(){
            console.log('connected');
        }
        socket.on('connect', onConnect)
    }, [])

  return (
    <>
        <UserContext.Provider value={{userInfo, setUserInfo}} >
            <StoryPage />
        </UserContext.Provider>
    </>
  )
}

export default App
