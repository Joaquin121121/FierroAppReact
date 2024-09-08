import React, { useContext, useEffect } from "react"
import styles from "../styles/SuccessfulSession.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import { useState } from "react"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"

function SuccessfulSession(navigate, animation) {
  const [counter, setCounter] = useState(0)
  const [shownMinutes, setShownMinutes] = useState(0)
  const [startAnimation, setStartAnimation] = useState(false)
  const [startStreakAnimation, setStartStreakAnimation] = useState(false)
  const t = useContext(TranslationContext)
  const { user } = useContext(UserContext)

  const minutes = user.plan.duration
  const streak = 9

  const onSave = () => {
    navigate("main")
  }

  useEffect(() => {
    setStartAnimation(true)
    setTimeout(() => {
      setCounter(1)
    }, 1000)
    setTimeout(() => {
      setStartStreakAnimation(true)
      setCounter(2)
      window.scrollTo({
        top: document.body.scrollHeight / 4,
        behavior: "smooth",
      })
    }, 2000)
  }, [])

  return (
    <div className={`${styles.card} ${animation}`}>
      <h1 className={styles.h1}>{t("completedSession")}</h1>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <img src="/images/strongmanCharacter.png" alt="" />
        </div>
        <div className={styles.rightContainer}>
          <div
            className={`${styles.statsCard} ${
              counter === 0 ? navAnimations.fadeInTopRight : ""
            }`}
            style={{ borderColor: "#0989FF", opacity: counter >= 0 ? 1 : "" }}
          >
            <div className={styles.statDisplayContainer}>
              <div className={styles.outerCircle}>
                <div
                  className={`${styles.innerCircle} ${styles.minuteDisplay}`}
                  style={{ "--num": startAnimation ? minutes : 0 }}
                ></div>
              </div>
            </div>
            <div className={styles.statTextContainer}>
              Minutos de Entrenamiento
            </div>
          </div>
          <div
            className={`${styles.statsCard} ${
              counter === 1 ? navAnimations.fadeInTopRight : ""
            }`}
            style={{ borderColor: "#00A859", opacity: counter >= 1 ? 1 : "" }}
          >
            <div className={styles.statDisplayContainer}></div>
            <div className={styles.statTextContainer}>
              de Ejercicios Completados
            </div>
          </div>
          <div
            className={`${styles.statsCard} ${
              counter === 2 ? navAnimations.fadeInTopRight : ""
            }`}
            style={{ borderColor: "#FF9900", opacity: counter >= 2 ? 1 : "" }}
          >
            <div className={styles.statDisplayContainer}>
              <span
                className={styles.streak}
                style={{ "--streak": startStreakAnimation ? streak : 0 }}
              ></span>
            </div>
            <div className={styles.statTextContainer}>Semanas en Racha</div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          style={{ backgroundColor: "#0989FF" }}
        >
          {t("share")}
          <i class="fa-solid fa-share fa-xl"></i>
        </button>
        <button
          className={styles.button}
          style={{ backgroundColor: "#00A859" }}
          onClick={onSave}
        >
          {t("save")}
        </button>
      </div>
    </div>
  )
}

export default SuccessfulSession
