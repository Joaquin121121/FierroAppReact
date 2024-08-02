import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { changeLanguage } from "i18next"

function PageLoader() {
  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (user && user.language) {
      console.log("wehere")
      changeLanguage(user.language)
    }
    user
      ? user.hasPlan
        ? navigate("/main")
        : navigate("/start")
      : navigate("/login")
  }, [])

  return <></>
}

export default PageLoader
