import '../App.css'
import { useEffect, useState } from 'react'
import UserContext from '../Contexts/UserContext'
import StoryPage from './StoryPage'
import socket from '../Utils/socket'
import LobbyPage from './LobbyPage'
import { Routes, Route } from 'react-router-dom'

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
           {/* <StoryPage /> */}
           <Routes>
            <Route path='/rooms' element={<StoryPage />} />
            <Route path='rooms/:room_code' element={<LobbyPage />} />
           </Routes>
        </UserContext.Provider>
    </>
  )
}

export default App
