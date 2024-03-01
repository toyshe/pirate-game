import '../App.css'
import { useState } from 'react'
import UserContext from '../Contexts/UserContext'
import StoryPage from './StoryPage'

function App() {
  const [userInfo, setUserInfo] = useState({username: '', avatarUrl: null, isSaboteur: false})

  return (
    <>
        <UserContext.Provider value={{userInfo, setUserInfo}} >
            <StoryPage />
        </UserContext.Provider>
    </>
  )
}

export default App
