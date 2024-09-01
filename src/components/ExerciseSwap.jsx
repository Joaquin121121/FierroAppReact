import React, { useContext, useState, useRef, useLayoutEffect } from "react"
import styles from "../styles/ExerciseSwap.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"
import parsedExercises from "../exercises.json"
import { db, auth } from "../services/firebase.js"
import { doc, updateDoc } from "firebase/firestore"

function ExerciseSwap({ animation, exercise, navigate, n }) {
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

  const [exerciseToReplace, setExerciseToReplace] = useState(null)

  const [similarExercises, setSimilarExercises] = useState(
    exercises.filter((e) => {
      return (
        e.name !== exercise &&
        e.targetedMuscles[0] === currentExercise?.targetedMuscles[0]
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
    Array(similarExercises.length + 1).fill(styles.fadeIn)
  )

  const [arrowClasses, setArrowClasses] = useState(Array(2).fill(""))

  const [selected, setSelected] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialPositions, setInitialPositions] = useState(Array(3).fill())

  const initializePositions = () => {
    setInitialPositions(
      initialPositions.map((_, i) => {
        const rect = cardRefs.current[i].current.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(
          cardRefs.current[i].current
        )
        const marginLeft = parseFloat(computedStyle.marginLeft)
        const marginTop = parseFloat(computedStyle.marginTop)

        return {
          left: rect.left + marginLeft,
          top: rect.top + marginTop,
        }
      })
    )
  }

  const onDrop = (e, i) => {
    e.preventDefault()
    if (i === 0) {
      if (e.clientX < window.innerWidth / 2) {
        return
      }
      if (e.clientY < window.innerHeight / 2) {
        transition(beingShown[0] + 1)
      } else {
        transition(beingShown[1] + 1)
      }
    } else {
      if (e.clientX > window.innerWidth / 2) {
        return
      }
      transition(i)
    }
  }

  const transition = (index) => {
    if (isTransitioning) {
      return
    }
    setIsTransitioning(true)
    const positionIndex = index % 2 === 1 ? 1 : 2
    const deltaX =
      initialPositions[0].left - initialPositions[positionIndex].left
    const deltaY = initialPositions[0].top - initialPositions[positionIndex].top

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
              translate: `${deltaX * -1.1}px ${deltaY * -1.1}px`,
              transition: "translate 600ms ease",
            }
          }
          if (i === index) {
            return {
              ...e,
              translate: `${deltaX * 1.1}px ${deltaY * 1.1}px`,
              transition: "translate 600ms ease",
            }
          }
          return e
        })
      )
    }, 300)
    setTimeout(() => {
      const newExercise = similarExercises[index - 1].name
      setExerciseToReplace(currentExercise)
      setCurrentExercise(exercises.find((e) => e.name === newExercise))
      setSimilarExercises(
        exercises.filter((e) => {
          return (
            e.name !== newExercise &&
            e.targetedMuscles[0] === currentExercise?.targetedMuscles[0]
          )
        })
      )
      setExerciseStyles(
        exerciseStyles.map((e, i) => ({
          display: beingShown.includes(i) || i === 0 ? "block" : "none",
          transition: "none",
        }))
      )
      setExerciseClassses(exerciseClasses.map(() => ""))
      setArrowClasses(arrowClasses.map(() => ""))
      setIsTransitioning(false)
    }, 1000)
  }

  const onRight = () => {
    setIsTransitioning(true)
    const firstElement =
      beingShown[1] + 1 >= similarExercises.length ? 0 : beingShown[1] + 1
    const secondElement = firstElement + 1
    setExerciseClassses(
      exerciseClasses.map((_, i) =>
        i === beingShown[0] + 1 || i === beingShown[1] + 1
          ? styles.fadeOut
          : i === firstElement + 1 || i === secondElement + 1
          ? styles.fadeIn
          : ""
      )
    )
    setTimeout(() => {
      setBeingShown([firstElement, secondElement])
      setSelected(firstElement)
    }, 400)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  const onLeft = () => {
    setIsTransitioning(true)
    const secondElement =
      beingShown[0] - 1 < 0 ? similarExercises.length : beingShown[0] - 1
    const firstElement = secondElement - 1
    setExerciseClassses(
      exerciseClasses.map((_, i) =>
        i === beingShown[0] + 1 || i === beingShown[1] + 1
          ? styles.fadeOut
          : i === firstElement + 1 || i === secondElement + 1
          ? styles.fadeIn
          : ""
      )
    )
    setTimeout(() => {
      setBeingShown([firstElement, secondElement])
      setSelected(firstElement)
    }, 400)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  const onLeave = () => {
    if (loading) {
      return
    }
    navigate("exerciseDisplay")
  }
  const onSave = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    setIsTransitioning(true)
    const docRef = doc(db, "userdata", auth.currentUser.uid)
    const exerciseGroup = Object.keys(parsedExercises).find(
      (key) =>
        Array.isArray(parsedExercises[key]) &&
        parsedExercises[key].some((e) => e.name === currentExercise.name)
    )
    const sessionData = user.plan[`session ${n}`]
    const updatedSession = {}
    Object.keys(sessionData).forEach((key) => {
      if (key === "exerciseList" || key === exerciseGroup) {
        updatedSession[key] = sessionData[key].map((e, i) => ({
          ...e,
          exercise:
            e.exercise.name === exerciseToReplace.name
              ? currentExercise
              : sessionData[key][i]["exercise"],
        }))
        return
      }
      updatedSession[key] = sessionData[key]
    })
    try {
      await updateDoc(docRef, { [`plan.session ${n}`]: updatedSession })
    } catch (error) {}
    user.plan[`session ${n}`] = updatedSession
    setUser(user)
    navigate("main")
  }

  useLayoutEffect(() => {
    console.log(user.plan[`session ${n}`])
    document.addEventListener("dragover", (event) => {
      event.preventDefault()
    })
    initializePositions()
    window.addEventListener("resize", initializePositions)

    return () => {
      window.removeEventListener("resize", initializePositions)
      document.removeEventListener("dragover", (event) => {
        event.preventDefault()
      })
    }
  }, [])

  return (
    <div className={`${styles.card} ${animation}`}>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h1 className={styles.h1}>{t("exerciseToKeep")}</h1>
          <div
            className={`${styles.exerciseCard} ${styles.leaving} ${exerciseClasses[0]}`}
            draggable
            onDragEnd={(e) => {
              onDrop(e, 0)
            }}
            ref={cardRefs.current[0]}
            style={{ ...exerciseStyles[0], cursor: "auto" }}
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
              draggable
              onDragEnd={(e) => {
                onDrop(e, i + 1)
              }}
              style={{
                ...exerciseStyles[i + 1],
                display: "block",
                visibility: beingShown.includes(i) ? "visible" : "hidden",
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
          <div
            className={styles.navigateContainer}
            style={{
              justifyContent:
                similarExercises.length <= 2 ? "center" : "space-between",
            }}
          >
            <i
              className={`${styles.navArrow} fa-solid fa-arrow-left fa-2xl`}
              onClick={onLeft}
              style={{ display: similarExercises.length <= 2 ? "none" : "" }}
            ></i>
            {`Showing ${beingShown[0] + 1}${
              similarExercises[beingShown[1]] ? ` - ${beingShown[1] + 1}` : ""
            } of ${similarExercises.length} similar exercises `}
            <i
              className={`${styles.navArrow} fa-solid fa-arrow-right fa-2xl`}
              onClick={onRight}
              style={{ display: similarExercises.length <= 2 ? "none" : "" }}
            ></i>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.button} ${styles.leave}`}
          onClick={onLeave}
        >
          {t("dontSave")}
        </button>
        <div
          className={styles.loadingAnimation}
          style={{ display: loading ? "block" : "none" }}
        >
          <img src="/images/loading-animation.gif" alt="loading-animation" />
        </div>
        <button className={`${styles.button} ${styles.save}`} onClick={onSave}>
          {t("save")}
        </button>
      </div>
    </div>
  )
}

export default ExerciseSwap
