import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/StartLight.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import Welcome from "./Welcome.jsx"
import New from "./New.jsx"
import Display from "./Display.jsx"
import ExerciseDisplay from "./ExerciseDisplay.jsx"
import "../styles/Global.css"
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext.jsx"
import ExerciseSwap from "./ExerciseSwap.jsx"

function Start() {
  const { param } = useParams()
  const { user } = useContext(UserContext)
  const [selectedAction, setSelectedAction] = useState(
    param ? (isNaN(Number(param)) ? param : "exerciseDisplay") : null
  )

  const [mouseDown, setMouseDown] = useState(false)
  const [sessionN, setSessionN] = useState(0)
  const [page, setPage] = useState(selectedAction || "welcome")
  const [exerciseToSwap, setExerciseToSwap] = useState("")
  const [welcomeAnimation, setWelcomeAnimation] = useState(
    navAnimations.fadeInRight
  )
  const [newAnimation, setNewAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )
  const [displayAnimation, setDisplayAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )
  const [ExerciseDisplayAnimation, setExerciseDisplayAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const [ExerciseSwapAnimation, setExerciseSwapAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const pages = ["welcome", "new", "display", "ExerciseDisplay"]
  const timeouts = []

  const routeNavigate = useNavigate()

  const setters = {
    welcome: setWelcomeAnimation,
    new: setNewAnimation,
    display: setDisplayAnimation,
    exerciseDisplay: setExerciseDisplayAnimation,
    exerciseSwap: setExerciseSwapAnimation,
  }

  const onMouseUp = () => {
    setMouseDown(false)
  }

  const navigate = (nextPage) => {
    while (timeouts.length > 2) {
      clearInterval(timeouts.shift())
    }
    const prevPage = page
    timeouts.push(
      setTimeout(() => {
        nextPage === "main" ? routeNavigate("/main") : setPage(nextPage)
      }, 500)
    )
    if (nextPage === "main") {
      setters[prevPage](navAnimations.fadeOutLeft)
      return
    }
    if (pages.indexOf(nextPage) > pages.indexOf(prevPage)) {
      setters[prevPage](navAnimations.fadeOutLeft)
      setters[nextPage](navAnimations.fadeInRight)
      timeouts.push(
        setTimeout(() => {
          setters[nextPage](null)
        }, 1000)
      )
    } else {
      setters[prevPage](navAnimations.fadeOutRight)
      setters[nextPage](navAnimations.fadeInLeft)
      timeouts.push(
        setTimeout(() => {
          setters[nextPage](null)
        }, 1000)
      )
    }
  }

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 })
  }, [page])

  useEffect(() => {
    if (selectedAction) {
      setTimeout(() => {
        setters[selectedAction](null)
      }, 500)
    }
    setTimeout(() => {
      setWelcomeAnimation(null)
    }, 500)
  }, [])

  return (
    <div className={`container ${styles.container}`} onMouseUp={onMouseUp}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.iconContainer}>
            <i
              className={`${styles.icon} fa-solid fa-dumbbell fa-2xl`}
              style={{ color: "#ffffff" }}
            ></i>
          </div>
          <h1>Fierro App</h1>
        </div>
        <div className={styles.user}>
          <i className={`${styles.userIcon} fa-regular fa-user fa-2xl`}></i>
          <div className={styles.text} id="user">
            {user.username || "Joaquin121"}
          </div>
        </div>
      </div>
      {page === "welcome" && (
        <Welcome
          navigate={navigate}
          animation={welcomeAnimation}
          setAnimation={setWelcomeAnimation}
        />
      )}
      {page === "new" && (
        <New
          mouseDown={mouseDown}
          setMouseDown={setMouseDown}
          navigate={navigate}
          animation={newAnimation}
          setAnimation={setNewAnimation}
          selectedAction={selectedAction}
        />
      )}
      {page === "display" && (
        <Display
          navigate={navigate}
          animation={displayAnimation}
          setAnimation={setDisplayAnimation}
          setSessionN={setSessionN}
          selectedAction={selectedAction}
        />
      )}
      {page === "exerciseDisplay" && (
        <ExerciseDisplay
          navigate={navigate}
          n={param || sessionN}
          animation={ExerciseDisplayAnimation}
          setAnimation={setExerciseDisplayAnimation}
          selectedAction={selectedAction}
          setExerciseToSwap={setExerciseToSwap}
        />
      )}
      {page === "exerciseSwap" && (
        <ExerciseSwap
          n={param || sessionN}
          navigate={navigate}
          animation={ExerciseSwapAnimation}
          exercise={exerciseToSwap}
        ></ExerciseSwap>
      )}
    </div>
  )
}

export default Start
