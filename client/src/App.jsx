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
    
    return (
      <div className={`app-layout ${currentRoom ? 'chat-active' : ''}`}>
        <div className="sidebar-container">
          <Allrooms sessionToken={sessionToken} setRoom={setCurrentRoom} logout={logout} />
        </div>
        <div className="chat-area-container">
          {currentRoom ? (
            <Messages sessionToken={sessionToken} room={currentRoom} setRoom={setCurrentRoom} logout={logout} />
          ) : (
            <div className="empty-chat-placeholder">
              <div className="empty-chat-icon">💬</div>
              <h3>Select a chat to start messaging</h3>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="app-header">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
          <h1>React Chat Bit By Bit</h1>
          {sessionToken && <button onClick={logout} className="logout-btn">Logout</button>}
        </div>
      </header>
      {handleView()}
    </>
  )
}

export default App
