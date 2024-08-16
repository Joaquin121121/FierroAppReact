import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Main.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import MainContent from "./MainContent"
import PlanContent from "./PlanContent"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"

function Main() {
  const [action, setAction] = useState("plan")
  const [selectedAction, setSelectedAction] = useState("plan")
  const [key, setKey] = useState("")
  const [menuAnimation, setMenuAnimation] = useState(null)
  const [topAnimation, setTopAnimation] = useState(null)
  const [homeAnimation, setHomeAnimation] = useState(null)
  const [logSessionAnimation, setLogSessionAnimation] = useState(null)
  const [calendarAnimation, setCalendarAnimation] = useState(null)
  const [planAnimation, setPlanAnimation] = useState(null)
  const [myStatsAnimation, setMyStatsAnimation] = useState(null)
  const [disableNavigation, setDisableNavigation] = useState(false)

  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const routeNavigate = useNavigate()

  const setters = {
    menu: setMenuAnimation,
    top: setTopAnimation,
    home: setHomeAnimation,
    logSession: setLogSessionAnimation,
    calendar: setCalendarAnimation,
    plan: setPlanAnimation,
    myStats: setMyStatsAnimation,
  }
  const sessions = user.plan.sessions
  const timeouts = []
  const componentActions = ["home", "logSession", "calendar", "plan", "myStats"]

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setKey("left")
    } else if (event.key === "ArrowRight") {
      setKey("right")
    }
  }

  const navigate = (nextAction) => {
    if (!disableNavigation) {
      timeouts.forEach((intervalID) => clearInterval(intervalID))
      setters[action](navAnimations.fadeOutTopRight)
      timeouts.push(
        setTimeout(() => {
          if (componentActions.includes(nextAction)) {
            setAction(nextAction)
          } else {
            routeNavigate(`/start/${nextAction}`)
          }
        }, 1000)
      )
      if (!componentActions.includes(nextAction)) {
        setDisableNavigation(true)
        setTopAnimation(navAnimations.fadeOutTopRight)
        setMenuAnimation(navAnimations.fadeOutTopRight)
        return
      }
      if (action === "plan") {
        setTopAnimation(navAnimations.fadeInTopRight)
      } else if (nextAction === "plan") {
        setTopAnimation(navAnimations.fadeOutTopRight)
      }
      setSelectedAction(nextAction)
      setters[nextAction](navAnimations.fadeInTopRight)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      routeNavigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (action === "plan" && user.plan.sessions >= 4) {
      window.addEventListener("keydown", onKeyDown)
    } else {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [action])

  useEffect(() => {
    setMenuAnimation(navAnimations.fadeInTopRight)
    setPlanAnimation(navAnimations.fadeInTopRight)
    setTimeout(() => {
      setMenuAnimation(null)
      setPlanAnimation(null)
    }, 1000)
  }, [])

  return (
    <div
      className={`container-fluid d-flex ${styles.containerFluid}`}
      style={{ overflow: "hidden" }}
    >
      <div className={`card ${styles.card} ${styles.card1} ${menuAnimation}`}>
        <div className={styles.header}>
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: "black" }}
          >
            <i
              className={`icon fa-solid fa-dumbbell fa-2xl`}
              style={{ color: "#ffffff", transform: "rotate(135deg)" }}
            ></i>
          </div>
          <div className={styles.brand}>
            <h1>Fierro App</h1>
          </div>
        </div>
        <div className={styles.buttons}>
          <div
            className={`${styles.button} ${
              selectedAction === "home" ? styles.selected : ""
            }`}
            onClick={() => {
              if (action !== "home") {
                navigate("home")
              }
            }}
          >
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-house fa-xl"></i>
            </div>
            <h6>{t("home")}</h6>
          </div>
          <div
            className={`${styles.button} ${
              selectedAction === "logSession" ? styles.selected : ""
            }`}
          >
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-dumbbell fa-xl"></i>
            </div>
            <h6>{t("logSession")}</h6>
          </div>
          <div
            className={`${styles.button} ${
              selectedAction === "calendar" ? styles.selected : ""
            }`}
          >
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-calendar-days fa-xl"></i>
            </div>
            <h6>{t("calendar")}</h6>
          </div>
          <div
            className={`${styles.button} ${
              selectedAction === "plan" ? styles.selected : ""
            }`}
            onClick={() => {
              if (action !== "plan") {
                navigate("plan")
              }
            }}
          >
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-clipboard-list fa-xl"></i>
            </div>
            <h6>{t("plan")}</h6>
            <div className={styles.extra}>
              <div className={styles.iconContainer}>
                <i className="fa-solid fa-pencil fa-md"></i>
              </div>
              <div className={styles.plans}>
                <p>{sessions}</p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.button} ${
              selectedAction === "myStats" ? styles.selected : ""
            }`}
          >
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-chart-simple fa-xl"></i>
            </div>
            <h6>{t("myStats")}</h6>
          </div>
          <div
            className={`${styles.button} ${styles.logoutButton} `}
            onClick={handleLogout}
          >
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-right-from-bracket fa-xl"></i>
            </div>
            <h6>{t("logOut")}</h6>
          </div>
        </div>
      </div>
      <div className={styles.cardsRight}>
        {action !== "plan" && (
          <div className={`${styles.top} ${topAnimation}`}>
            <div className={`card ${styles.card} ${styles.card2}`}>
              <h1>{t("myWeek")}</h1>
              <div className={styles.middleContainer}>
                <div className={styles.externalSessionsContainer}>
                  <div className={styles.internalSessionsContainer}>
                    <div className={styles.textContainer}>
                      <h1>1/3</h1>
                      {t("completedSessions")}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progress}>
                  <div
                    className={`progress-bar progress-bar-striped progress-bar-animated bg-success ${styles.weeklyProgress}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className={`card ${styles.card} ${styles.card3}`}>
              <div className={styles.textContainer}>
                <span className={styles.streak}>{user.perfectStreak}</span>
                <h1 style={{ textAlign: "left" }}>{t("streakWeeks")}</h1>
              </div>
              <div className={styles.imageContainer}>
                <img src="Images/streak.png" alt="" />
              </div>
            </div>
          </div>
        )}
        {action === "main" ? (
          <div className={`card ${styles.card} ${styles.card4}`}>
            <MainContent
              animation={homeAnimation}
              setAnimation={setHomeAnimation}
            ></MainContent>
          </div>
        ) : action === "plan" ? (
          <PlanContent
            pressedKey={key}
            animation={planAnimation}
            setAnimation={setPlanAnimation}
            navigate={navigate}
          ></PlanContent>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Main
