import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.jsx'
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { UserProvider } from './Contexts/UserContext.jsx'
import { UsersProvider } from './Contexts/UsersContext.jsx'
import { LivesProvider } from './Contexts/LivesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  /* <React.StrictMode> */
  <BrowserRouter>
    <UserProvider>
      <UsersProvider>
        <LivesProvider>

          <App />
        </LivesProvider>
      </UsersProvider>
    </UserProvider>
  </BrowserRouter>
  /* </React.StrictMode>, */
)
