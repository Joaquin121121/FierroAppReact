import React, { useContext, useState, useRef } from "react"
import styles from "../styles/ExerciseSwap.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"
import parsedExercises from "../exercises.json"

function ExerciseSwap({ animation }) {
  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const exercise = "benchPress"
  const exercises = [
    ...parsedExercises.chestExercises,
    ...parsedExercises.backExercises,
    ...parsedExercises.shoulderExercises,
    ...parsedExercises.legExercises,
    ...parsedExercises.forearmExercises,
    ...parsedExercises.bicepsExercises,
    ...parsedExercises.tricepsExercises,
  ]
  const currentExercise = exercises.find((e) => e.name === exercise)
  const targetedMuscles = currentExercise ? currentExercise.targetedMuscles : []
  const similarExercises = exercises.filter((e) => {
    return (
      e.name !== exercise &&
      e.targetedMuscles.length === targetedMuscles.length &&
      e.targetedMuscles.every(
        (muscle, index) => muscle === targetedMuscles[index]
      )
    )
  })
  const cardRefs = Array(similarExercises.length + 1)
    .fill()
    .map(() => React.createRef())

  const [beingShown, setBeingShown] = useState([0, 1])
  const [selected, setSelected] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [similarExercisesData, setSimilarExercisesData] =
    useState(similarExercises)
  const transition = (i) => {
    const index = i || selected + 1
    if (isTransitioning) {
      return
    }

    setIsTransitioning(true)
    const originalPosition = cardRefs[0].current.getBoundingClientRect()
    const swapPosition = cardRefs[index].current.getBoundingClientRect()

    const deltaX = originalPosition.left - swapPosition.left
    const deltaY = originalPosition.top - swapPosition.top
    cardRefs[0].current.style.transform = `translate(${deltaX * -1 - 25}px, ${
      deltaY * -1
    }px)`
    cardRefs[
      index
    ].current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    setTimeout(() => {
      cardRefs[0].current.style.transform = `translate(0px, 0px)`
      cardRefs[index].current.style.transform = `translate(0px, 0px)`
      setIsTransitioning(false)
    }, 1000)
  }

  return (
    <div className={`${styles.card} ${animation}`}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h1 className={styles.h1}>{t("exerciseToSwap")}</h1>
          <div
            className={`${styles.exerciseCard} ${styles.leaving}`}
            ref={cardRefs[0]}
          >
            <h2 className={styles.h2}>{t("benchPress")}</h2>
            <div className={styles.itemContainer}>
              <div className={styles.iconContainer}>
                <img src="/images/strength.png" alt="" />
              </div>
              Placeholder
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.iconContainer}>
                <i
                  className="fa-solid fa-clipboard-question fa-xl"
                  style={{ color: "#0989ff" }}
                ></i>
              </div>
              Placeholder
            </div>
            <div className={styles.itemContainer}>
              <div className={styles.iconContainer}>
                <i
                  className="fa-solid fa-dumbbell fa-xl"
                  style={{ color: "#0989ff" }}
                ></i>
              </div>
              Placeholder
            </div>
          </div>
        </div>
        <div className={styles.middleContainer}>
          <p className={styles.p}>{t("swapInstructions")}</p>
          <div className={`${styles.arrow} ${styles.rightArrow}`}>
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className={`${styles.arrow} ${styles.leftArrow}`}>
            <div className=""></div>
            <div className=""></div>
          </div>
          <button className={styles.swapButton}>
            <i
              className="fa-solid fa-arrows-rotate fa-2xl"
              style={{ color: "#ffffff" }}
            ></i>
          </button>
          {t("swap")}
        </div>
        <div className={styles.rightContainer}>
          <h1 className={styles.h1}>{t("similarExercises")}</h1>
          {similarExercisesData.map((e, i) => (
            <div
              className={`${styles.exerciseCard} ${
                selected === i ? styles.selected : ""
              }`}
              style={{ display: beingShown.includes(i) ? "" : "none" }}
              onClick={() => {
                setSelected(i)
              }}
              onDoubleClick={() => {
                transition(i + 1)
              }}
              ref={cardRefs[i + 1]}
            >
              <h2 className={styles.h2}>{t(e.name)}</h2>
              <div className={styles.itemContainer}>
                <div className={styles.iconContainer}>
                  <img src="/images/strength.png" alt="" />
                </div>
                {e.targetedMuscles}
              </div>
              <div className={styles.itemContainer}>
                <div className={styles.iconContainer}>
                  <i
                    className="fa-solid fa-clipboard-question fa-xl"
                    style={{ color: "#0989ff" }}
                  ></i>
                </div>
                {e.targetedMuscles}
              </div>
              <div className={styles.itemContainer}>
                <div className={styles.iconContainer}>
                  <i
                    className="fa-solid fa-dumbbell fa-xl"
                    style={{ color: "#0989ff" }}
                  ></i>
                </div>
                Placeholder
              </div>
            </div>
          ))}
          <div className={styles.navigateContainer}></div>
        </div>
      </div>
      <div className={styles.buttonContainer}></div>
    </div>
  )
}

export default ExerciseSwap
