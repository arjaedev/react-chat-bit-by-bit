import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'
import Allrooms from './components/Allroom'
import Messages from './components/Messages'

function App() {
  
  const [sessionToken, setSessionToken] = useState(undefined)
  const [currentRoom, setCurrentRoom] = useState(undefined)
  console.log("Value of our session token", sessionToken)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      setSessionToken(token)
    }
  }, [])

  const updateLocalStorage = newToken => {
    if (!newToken || newToken === "undefined" || newToken === "null") return;
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setSessionToken(undefined)
    setCurrentRoom(undefined)
  }

  const handleView = () => {
    if (!sessionToken) {
      return <Auth updateLocalStorage={updateLocalStorage} />
    }
    if (currentRoom) {
      return <Messages sessionToken={sessionToken} room={currentRoom} setRoom={setCurrentRoom} logout={logout} />
    }
    return <Allrooms sessionToken={sessionToken} setRoom={setCurrentRoom} logout={logout} />
  }

  return (
    <>
      <header className="app-header">
        <h1>React Chat Bit By Bit</h1>
      </header>
      {handleView()}
      {sessionToken && <button onClick={logout} className="logout-btn">Logout</button>}
    </>
  )
}

export default App
