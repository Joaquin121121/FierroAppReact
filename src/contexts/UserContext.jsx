import React, { createContext, useEffect, useState } from "react"
import { auth } from "../services/firebase.js"
import { signOut } from "firebase/auth"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const storedUser = sessionStorage.getItem("user")
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null)

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user))
    } else {
      sessionStorage.removeItem("user")
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
