import React, { useEffect, useState } from "react"
import styles from "../styles/ExerciseSwap.module.css"
import navAnimations from "../styles/NavAnimations.module.css"

function ExerciseSwap({ session, n, t, setPage, prevPage, setPrevPage }) {
  const length = session.exerciseList.length
  const lengthArray = Array.from({ length }, (_, i) => i)
  const [exerciseN, setExerciseN] = useState(0)
  const [navAnimation, setNavAnimation] = useState("")

  const onLeft = () => {
    setExerciseN((index) => {
      if (index === 0) return length - 1
      return index - 1
    })
    console.log(exerciseN)
  }

  const onRight = () => {
    setExerciseN((index) => {
      if (index === length - 1) return 0
      return index + 1
    })
  }

  const onBack = () => {
    window.removeEventListener("keydown", onKeyDown)
    setPrevPage("exerciseSwap")
    setNavAnimation(navAnimations.fadeOutRight)
    setTimeout(() => {
      setPage("display")
    }, 500)
  }

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      onLeft()
    } else if (event.key === "ArrowRight") {
      onRight()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    if (prevPage === "display") {
      setNavAnimation(navAnimations.fadeInRight)
    }
  }, [])

  return (
    <div className={`${navAnimation} ${styles.card} `}>
      <h1>
        {t("session")} {n} -{" "}
        <span className={styles.span}>
          {t("exercises").charAt(0).toUpperCase() + t("exercises").slice(1)}
        </span>
      </h1>
      <div className={styles.parentContainer}>
        <div className={styles.leftButtons}>
          <div
            className={styles.exerciseButton}
            style={{ backgroundColor: "black" }}
            onClick={onLeft}
          >
            <i
              className="fa-solid fa-arrow-left fa-2xl"
              style={{ color: "#ffffff" }}
            ></i>
          </div>
        </div>
        <div className={`${styles.card} ${styles.exerciseCard}`}>
          {lengthArray.map((i) => (
            <div
              className={styles.contentContainer}
              key={i}
              style={{ translate: `${exerciseN * -100}%` }}
            >
              <h1>
                {t(session.exerciseList[i].exercise.name)
                  .charAt(0)
                  .toUpperCase() +
                  t(session.exerciseList[i].exercise.name).slice(1)}
              </h1>
              <div className={styles.itemContainer}>
                <div className={styles.iconContainer}>
                  <img src="images/strength.png" alt="" />
                </div>
                <span key={i}>
                  {session.exerciseList[i].exercise.targetedMuscles
                    .map(
                      (muscle, i) =>
                        t(muscle).charAt(0).toUpperCase() + t(muscle).slice(1)
                    )
                    .join(", ")}
                </span>
              </div>
              <div className={styles.itemContainer}>
                <div className={styles.iconContainer}>
                  <i
                    className="fa-solid fa-clipboard-question fa-xl"
                    style={{ color: "#0989ff" }}
                  ></i>
                </div>
                {session.exerciseList[i].reps} {t("reps")}
              </div>
              <div className={`${styles.itemContainer} ${styles.dumbbell}`}>
                <div className={styles.iconContainer}>
                  <i
                    className="fa-solid fa-dumbbell fa-xl"
                    style={{ color: "#0989ff" }}
                  ></i>
                </div>
                {session.exerciseList[i].sets > 1
                  ? `${session.exerciseList[i].sets} sets`
                  : `${session.exerciseList[i].sets} set`}
              </div>
              <div className={styles.imgContainer}>
                <img
                  src={`images/${session.exerciseList[i].exercise.image}`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.rightButtons}>
          <div
            className={styles.exerciseButton}
            style={{ backgroundColor: "#0989ff", opacity: 1 }}
          >
            <i
              className="fa-solid fa-arrows-rotate fa-2xl"
              style={{ color: "#ffffff" }}
            ></i>
          </div>
          <div
            className={styles.exerciseButton}
            style={{ backgroundColor: "black" }}
            onClick={onRight}
          >
            <i
              className="fa-solid fa-arrow-right fa-2xl"
              style={{ color: "#ffffff" }}
            ></i>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.exerciseSwapButtons}>
          {lengthArray.map((i) => (
            <button
              className={`${styles.exerciseSwapButton} ${
                exerciseN === i ? styles.selected : ""
              }`}
              onClick={() => {
                setExerciseN(i)
              }}
            ></button>
          ))}
        </div>
        <button className={styles.backButton} onClick={onBack}>
          {t("goBack")}
        </button>
        <button className={styles.startButton}>{t("start")}</button>
      </div>
    </div>
  )
}

export default ExerciseSwap
