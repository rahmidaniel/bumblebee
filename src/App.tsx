import { useState, useEffect } from "react"
import LoginPage from "./pages/LoginPage"
import HoneyListPage from "./pages/HoneyListPage"
import { toast } from "sonner"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    toast.success("Login successful!", {
      description: "Welcome to the Honey Shop!",
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn")
    toast.info("Logged out", {
      description: "You have been logged out successfully.",
    })
  }

  return (
    <div className="min-h-dvh bg-amber-50">
      {isLoggedIn ? <HoneyListPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}
    </div>
  )
}

export default App

