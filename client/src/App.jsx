import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'
import Allrooms from './components/Allroom'
import Allmessages from './components/Allmessage'

function App() {
  
  const [sessionToken, setSessionToken] = useState(undefined)
  console.log("Value of our session token", sessionToken)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }

  const handleView = () => {
    return !sessionToken
      ? <Auth updateLocalStorage={updateLocalStorage} />
      : <Allrooms sessionToken={sessionToken} />
  }

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
      setSessionToken(undefined)
    }
  }

  return (
    <>
      {handleView()}
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default App
