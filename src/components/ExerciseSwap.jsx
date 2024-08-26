import React, { useContext, useState, useRef, useLayoutEffect } from "react"
import styles from "../styles/ExerciseSwap.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"
import parsedExercises from "../exercises.json"

function ExerciseSwap({ animation, exercise }) {
  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const exercises = [
    ...parsedExercises.chestExercises,
    ...parsedExercises.backExercises,
    ...parsedExercises.shoulderExercises,
    ...parsedExercises.legExercises,
    ...parsedExercises.forearmExercises,
    ...parsedExercises.bicepsExercises,
    ...parsedExercises.tricepsExercises,
  ]

  const [currentExercise, setCurrentExercise] = useState(
    exercises.find((e) => e.name === exercise)
  )

  const [similarExercises, setSimilarExercises] = useState(
    exercises.filter((e) => {
      return (
        e.name !== exercise &&
        e.targetedMuscles.length ===
          (currentExercise?.targetedMuscles.length || 0) &&
        e.targetedMuscles.every(
          (muscle, index) => muscle === currentExercise?.targetedMuscles[index]
        )
      )
    })
  )

  const cardRefs = useRef(
    Array(similarExercises.length + 1)
      .fill()
      .map(() => React.createRef())
  )

  const [beingShown, setBeingShown] = useState([0, 1])

  const [exerciseStyles, setExerciseStyles] = useState(
    Array(similarExercises.length + 1)
      .fill("")
      .map((e, i) => ({ display: beingShown.includes(i) ? "block" : "none" }))
  )

  const [exerciseClasses, setExerciseClassses] = useState(
    Array(similarExercises.length + 1).fill("")
  )

  const [arrowClasses, setArrowClasses] = useState(Array(2).fill(""))

  const [selected, setSelected] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [initialPositions, setInitialPositions] = useState(Array(3).fill())

  const initializePositions = () => {
    setInitialPositions(
      initialPositions.map((_, i) =>
        cardRefs.current[i].current.getBoundingClientRect()
      )
    )
  }

  const transition = (index) => {
    if (isTransitioning) {
      return
    }
    setIsTransitioning(true)
    const deltaX = initialPositions[0].left - initialPositions[index].left
    const deltaY = initialPositions[0].top - initialPositions[index].top

    setExerciseClassses(
      exerciseClasses.map((e, i) => (i === 0 || i === index ? styles.up : e))
    )
    setArrowClasses(arrowClasses.map(() => styles.sweep))
    setTimeout(() => {
      setExerciseStyles(
        exerciseStyles.map((e, i) => {
          if (i === 0) {
            return {
              ...e,
              translate: `${deltaX * -1}px ${deltaY * -1}px`,
              transition: "translate 600ms ease",
            }
          }
          if (i === index) {
            return {
              ...e,
              translate: `${deltaX}px ${deltaY}px`,
              transition: "translate 1s ease",
            }
          }
          return e
        })
      )
    }, 300)
    setTimeout(() => {
      const newExercise = similarExercises[index - 1].name
      setCurrentExercise(exercises.find((e) => e.name === newExercise))
      setSimilarExercises(
        exercises.filter((e) => {
          return (
            e.name !== newExercise &&
            e.targetedMuscles.length ===
              (currentExercise?.targetedMuscles.length || 0) &&
            e.targetedMuscles.every(
              (muscle, index) =>
                muscle === currentExercise?.targetedMuscles[index]
            )
          )
        })
      )
      setExerciseStyles(
        exerciseStyles.map((e, i) => ({
          display: beingShown.includes(i) ? "block" : "none",
          transition: "none",
        }))
      )
      setExerciseClassses(exerciseClasses.map(() => ""))
      setArrowClasses(arrowClasses.map(() => ""))
      setIsTransitioning(false)
    }, 1200)
  }

  useLayoutEffect(() => {
    initializePositions()
    window.addEventListener("resize", initializePositions)
  }, [])

  return (
    <div className={`${styles.card} ${animation}`}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h1 className={styles.h1}>{t("exerciseToKeep")}</h1>
          <div
            className={`${styles.exerciseCard} ${styles.leaving} ${exerciseClasses[0]}`}
            ref={cardRefs.current[0]}
            style={exerciseStyles[0]}
          >
            <h2 className={styles.h2}>{t(currentExercise.name)}</h2>
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
          <div
            className={`${styles.arrow} ${styles.rightArrow} ${arrowClasses[0]}`}
          >
            <div className={`${styles.leftEnd} ${arrowClasses[0]}`}></div>
            <div className={`${styles.leftEnd} ${arrowClasses[0]}`}></div>
          </div>
          <div
            className={`${styles.arrow} ${styles.leftArrow} ${arrowClasses[1]}`}
          >
            <div className={`${styles.rightEnd} ${arrowClasses[1]}`}></div>
            <div className={`${styles.rightEnd} ${arrowClasses[1]}`}></div>
          </div>
          <button
            className={styles.swapButton}
            onClick={() => {
              transition(selected + 1)
            }}
          >
            <i
              className="fa-solid fa-arrows-rotate fa-2xl"
              style={{ color: "#ffffff" }}
            ></i>
          </button>
          {t("swap")}
        </div>
        <div className={styles.rightContainer}>
          <h1 className={styles.h1}>{t("similarExercises")}</h1>
          {similarExercises.map((e, i) => (
            <div
              className={`${styles.exerciseCard} ${
                selected === i ? styles.selected : ""
              } ${exerciseClasses[i + 1]}`}
              style={{
                ...exerciseStyles[i + 1],
                display: beingShown.includes(i) ? "" : "none",
              }}
              onClick={() => {
                setSelected(i)
              }}
              onDoubleClick={() => {
                transition(i + 1)
              }}
              ref={cardRefs.current[i + 1]}
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
