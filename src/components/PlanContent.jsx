import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/PlanContent.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"

function PlanContent() {
  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)
  const [showMore, setShowMore] = useState(false)
  const nSessions = user.plan.sessions

  const sessions = Array.from({ length: nSessions }).reduce((acc, _, i) => {
    acc[i] = user.plan[`session ${i + 1}`]
    return acc
  }, [])

  return (
    <div className={styles.card}>
      <h1 className={styles.h1}>
        {t("miPlan")} - {user.plan.name}
      </h1>
      <div className={styles.topSessionContainer}>
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
              <p className={styles.p}>{t(e.name)}</p>
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
            <button className={`${styles.button} ${styles.editButton}`}>
              Edit Session{" "}
              <i
                className="fa-solid fa-pencil fa-lg"
                style={{ color: "white" }}
              ></i>
            </button>
          </div>
        ))}
      </div>
      <div className={styles.switchContainer}>
        {nSessions > 3 && (
          <i
            className={`${styles.arrow} fa-solid fa-arrow-left fa-2xl`}
            onClick={() => setShowMore(false)}
          ></i>
        )}
        <p className={styles.p2}>
          Mostrando sesiones &nbsp;&nbsp;{showMore ? "4" : "1"} -{" "}
          {showMore ? nSessions : nSessions === 2 ? "2" : "3"}
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
          Swap Exercises
          <i className="fa-solid fa-dumbbell fa-xl"></i>
        </button>
        <button className={`${styles.button} ${styles.preferencesButton}`}>
          Change preferences
          <i className="fa-solid fa-arrow-rotate-right fa-xl"></i>
        </button>
      </div>
    </div>
  )
}

export default PlanContent
