import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/PlanContent.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"

function PlanContent({ pressedKey, animation, setAnimation, navigate }) {
  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)
  const [showMore, setShowMore] = useState(false)

  const nSessions = user.plan.sessions

  const sessions = Array.from({ length: nSessions }).reduce((acc, _, i) => {
    acc[i] = user.plan[`session ${i + 1}`]
    return acc
  }, [])

  const onHover = (e) => {
    setAnimation(
      animation && animation !== styles.hover
        ? animation
        : e._reactName === "onMouseEnter"
        ? styles.hover
        : null
    )
  }

  const onChangePreferences = () => {
    navigate("new")
  }

  const onEditSession = (n) => {
    navigate(`${n}`)
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimation(null)
    }, 1000)
    console.log(sessions)
  }, [])

  useEffect(() => {
    if (pressedKey === "right" && !showMore) {
      setShowMore(true)
    } else if (pressedKey === "left" && showMore) {
      setShowMore(false)
    }
  }, [pressedKey])

  return (
    <div
      className={`${styles.card} ${animation}`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <h1 className={styles.h1}>
        {t("miPlan")} - {user.plan.name}
      </h1>
      <div
        className={styles.topSessionContainer}
        style={{ justifyContent: nSessions === 2 ? "center" : "" }}
      >
        {sessions.map((e, i) => (
          <div
            className={styles.session}
            style={
              showMore && (i === 0 || i === 1 || i === 2)
                ? { translate: `-${(i + 1) * 400}px` }
                : showMore
                ? { translate: `-${3 * 340}px` }
                : null
            }
          >
            <h2 className={styles.h2}>
              {t("session")}&nbsp; {i + 1}
            </h2>
            <div className={styles.item}>
              <i
                className="fa-solid fa-check fa-xl"
                style={{ color: "#0989FF" }}
              ></i>
              <p className={styles.p}>{t(e.name) || t("fullBodySplit")}</p>
            </div>
            <div className={styles.item}>
              <i
                className="fa-solid fa-check fa-xl"
                style={{ color: "#0989FF" }}
              ></i>
              <p className={styles.p}>{t(e.nExercises)}&nbsp;exercises</p>
            </div>
            <div className={styles.item}>
              <i
                className="fa-solid fa-check fa-xl"
                style={{ color: "#0989FF" }}
              ></i>
              <p className={styles.p}>Pecho, Tríceps</p>
            </div>
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => {
                onEditSession(i + 1)
              }}
            >
              {t("editSession")}{" "}
              <i
                className="fa-solid fa-pencil fa-lg"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
        ))}
      </div>
      <div
        className={styles.switchContainer}
        style={{
          justifyContent:
            nSessions === 2 || nSessions === 3 ? "center" : "space-between",
        }}
      >
        {nSessions > 3 && (
          <i
            className={`${styles.arrow} fa-solid fa-arrow-left fa-2xl`}
            onClick={() => setShowMore(false)}
          ></i>
        )}
        <p className={styles.p2}>
          {t("showing")} &nbsp;&nbsp;{showMore ? "4" : "1"} -{" "}
          {showMore ? nSessions : nSessions === 2 ? "2" : "3"} of {nSessions}{" "}
          {nSessions === 4 && showMore
            ? t("session").toLowerCase()
            : t("sessions")}{" "}
        </p>
        {nSessions > 3 && (
          <i
            className={`${styles.arrow} fa-solid fa-arrow-right fa-2xl`}
            onClick={() => setShowMore(true)}
          ></i>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${styles.swapButton}`}>
          {t("swapExercises")}
          <i className="fa-solid fa-dumbbell fa-xl"></i>
        </button>
        <button
          className={`${styles.button} ${styles.preferencesButton}`}
          onClick={onChangePreferences}
        >
          {t("changePreferences")}
          <i className="fa-solid fa-arrow-rotate-right fa-xl"></i>
        </button>
      </div>
    </div>
  )
}

export default PlanContent
