import '../App.css'
import { useEffect, useState } from 'react'
import { UserProvider } from '../Contexts/UserContext'
import StoryPage from './StoryPage'
import socket from '../Utils/socket'
import LobbyPage from './LobbyPage'
import { Routes, Route } from 'react-router-dom'
import TitlePage from './TitlePage'
import JoinRoom from './JoinRoom'
import PlayerRole from './PlayerRole'
import GameRoom from './GameRoom'

function App() {

  useEffect(() => {

    function onConnect() {
      console.log('connected');
    }
    socket.on('connect', onConnect)
  }, [])

  return (
    <>
      <UserProvider >
        {/* <StoryPage /> */}
        <Routes>
          <Route path='/' element={<TitlePage />} />
          <Route path='/story' element={<StoryPage />} />
          <Route path='/rooms' element={<JoinRoom />} />
          <Route path='rooms/:room_code' element={<LobbyPage />} />
          <Route path='rooms/:room_code/play' element={<GameRoom />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
