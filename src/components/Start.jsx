import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/StartLight.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import Welcome from "./Welcome.jsx"
import Display from "./Display.jsx"
import ExerciseDisplay from "./ExerciseDisplay.jsx"
import "../styles/Global.css"
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext.jsx"
import ExerciseSwap from "./ExerciseSwap.jsx"
import SuccessfulSession from "./SuccessfulSession.jsx"
import Premade from "./Premade.jsx"
import Custom from "./Custom.jsx"
import PlanChoice from "./PlanChoice.jsx"
import Frequency from "./Frequency.jsx"
import UploadPlan from "./UploadPlan.jsx"

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

  const [frequencyAnimation, setFrequencyAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const [planChoiceAnimation, setPlanChoiceAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const [customAnimation, setCustomAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const [premadeAnimation, setPremadeAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )
  const [displayAnimation, setDisplayAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )
  const [exerciseDisplayAnimation, setExerciseDisplayAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const [exerciseSwapAnimation, setExerciseSwapAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )
  const [successfulSessionAnimation, setSuccessfulSessionAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const [uploadAnimation, setUploadAnimation] = useState(
    selectedAction ? navAnimations.fadeInRight : null
  )

  const pages = [
    "welcome",
    "frequency",
    "planChoice",
    "custom",
    "premade",
    "display",
    "ExerciseDisplay",
  ]
  const timeouts = []

  const routeNavigate = useNavigate()

  const setters = {
    welcome: setWelcomeAnimation,
    frequency: setFrequencyAnimation,
    planChoice: setPlanChoiceAnimation,
    custom: setCustomAnimation,
    premade: setPremadeAnimation,
    display: setDisplayAnimation,
    exerciseDisplay: setExerciseDisplayAnimation,
    exerciseSwap: setExerciseSwapAnimation,
    successfulSession: setSuccessfulSessionAnimation,
    uploadPlan: setUploadAnimation,
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
      {page === "frequency" && (
        <Frequency
          animation={frequencyAnimation}
          navigate={navigate}
        ></Frequency>
      )}
      {page === "planChoice" && (
        <PlanChoice
          mouseDown={mouseDown}
          setMouseDown={setMouseDown}
          navigate={navigate}
          animation={planChoiceAnimation}
          setAnimation={setPlanChoiceAnimation}
          selectedAction={selectedAction}
        />
      )}
      {page === "premade" && (
        <Premade
          mouseDown={mouseDown}
          setMouseDown={setMouseDown}
          navigate={navigate}
          animation={premadeAnimation}
          setAnimation={setPremadeAnimation}
          selectedAction={selectedAction}
        />
      )}
      {page === "custom" && (
        <Custom
          mouseDown={mouseDown}
          setMouseDown={setMouseDown}
          navigate={navigate}
          animation={customAnimation}
          setAnimation={setCustomAnimation}
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
          animation={exerciseDisplayAnimation}
          setAnimation={setExerciseDisplayAnimation}
          selectedAction={selectedAction}
          setExerciseToSwap={setExerciseToSwap}
        />
      )}
      {page === "exerciseSwap" && (
        <ExerciseSwap
          n={param || sessionN}
          navigate={navigate}
          animation={exerciseSwapAnimation}
          exercise={exerciseToSwap}
        ></ExerciseSwap>
      )}
      {page === "successfulSession" && (
        <SuccessfulSession
          navigate={navigate}
          animation={successfulSessionAnimation}
        ></SuccessfulSession>
      )}
      {page === "uploadPlan" && (
        <UploadPlan animation={uploadAnimation}></UploadPlan>
      )}
    </div>
  )
}

export default Start
