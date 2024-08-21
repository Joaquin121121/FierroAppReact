import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/ExerciseSwap.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"

function ExerciseSwap({
  n,
  animation,
  setAnimation,
  navigate,
  selectedAction,
}) {
  const load =
    n.toString().length ===
    2 /* Checks if the action is a swap or a load by number of numbers passed in params */

  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const processedN = parseInt(n.toString().charAt(0))
  const session = user.plan[`session ${processedN}`]
  const length = session.exerciseList.length
  const lengthArray = Array.from({ length }, (_, i) => i)
  const actionTimeouts = []
  const initialCardStyles = lengthArray.map((i) => {
    return {
      translate: `${i * -97}% ${i * -1.5}%`,
      zIndex: length - i,
    }
  })
  const initialCardAnimations = Array.from({ length }, () => "")

  const [exerciseN, setExerciseN] = useState(0)
  const [transition, setTransition] = useState("")
  const [transitionVisibility, setTransitionVisibility] = useState("")
  const [transitionContentVisibility, setTransitionContentVisibility] =
    useState("none")
  const [transitionFlag, setTransitionFlag] = useState(false)
  const [actionIcon, setActionIcon] = useState("")
  const [actionMessage, setActionMessage] = useState("")
  const [cardStyles, setCardStyles] = useState(initialCardStyles)
  const [cardAnimations, setCardAnimations] = useState(initialCardAnimations)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const onLeft = () => {
    if (exerciseN === 0) {
      setCardStyles(
        cardStyles.map((e, i) => {
          return {
            ...e,
            zIndex: i === length - 1 ? 1 : -1,
            opacity: i === length - 1 ? 1 : 0,
          }
        })
      )
      setCardAnimations(
        cardAnimations.map((_, i) => (i === length - 1 ? styles.enter : ""))
      )
    } else {
      setCardAnimations(
        cardAnimations.map((_, i) => (i === exerciseN - 1 ? styles.enter : ""))
      )
      setCardStyles(
        cardStyles.map((e, i) => {
          return {
            ...e,
            zIndex: i === exerciseN - 1 ? length - (exerciseN - 1) : e.zIndex,
            opacity: i === exerciseN - 1 ? 1 : e.opacity,
          }
        })
      )
    }
    setExerciseN((index) => {
      if (index === 0) return length - 1
      return index - 1
    })
    console.log(exerciseN)
  }

  const onRight = () => {
    if (isTransitioning) {
      return
    }
    setIsTransitioning(true)
    setCardAnimations(
      cardAnimations.map((_, i) => (i === exerciseN ? styles.leave : ""))
    )
    setTimeout(() => {
      setCardStyles(
        cardStyles.map((e, i) => {
          return {
            ...e,
            zIndex: i === exerciseN ? -1 : e.zIndex,
            opacity: i === exerciseN ? 0 : e.opacity,
          }
        })
      )
      setExerciseN((index) => {
        if (index === length - 1) {
          setCardAnimations(Array.from({ length }, () => styles.enter))
          setCardStyles(initialCardStyles)
          return 0
        }
        return index + 1
      })
      setIsTransitioning(false)
    }, 500)
  }

  const onRollBack = () => {
    console.log("rollback")
  }

  const onAction = (action) => {
    if (!transitionFlag) {
      setTransitionFlag(true)
      setTransition(`${styles.transition} ${styles[action]} ${styles.fadeIn}`)
      actionTimeouts.push([
        setTimeout(() => {
          setTransitionVisibility("1")
          setTransitionContentVisibility("flex")
          setActionIcon(
            `fa-solid fa-${action === "success" ? "check" : "xmark"} fa-2xl`
          )
          setActionMessage(`${action}Message`)
          onRight()
        }, 1000),

        setTimeout(() => {
          setTransitionVisibility("")
          setTransitionContentVisibility("none")
          setTransition(
            `${styles.transition} ${styles[action]} ${styles.fadeOut}`
          )
        }, 2000),
        setTimeout(() => {
          setTransitionFlag(false)
        }, 2500),
      ])
    }
  }

  const onBack = () => {
    selectedAction ? navigate("main") : navigate("display")
  }

  const onStart = () => {
    navigate("main")
  }

  const onHover = (e) => {
    setAnimation(
      animation && animation !== styles.hover
        ? animation
        : e._reactName === "onMouseEnter"
        ? styles.hover
        : null
    )
  }

  return (
    <div
      className={`${styles.card} ${animation}`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <h1 style={{ marginBottom: "80px" }}>
        {t("session")} {processedN} -{" "}
        <span className={styles.span}>
          {t("exercises").charAt(0).toUpperCase() + t("exercises").slice(1)}
        </span>
      </h1>
      <div className={styles.parentContainer}>
        <div
          className={styles.leftButtons}
          style={{ justifyContent: load ? "space-between" : "end" }}
        >
          {load && (
            <div className={styles.exerciseButtonContainer}>
              <div
                className={styles.exerciseButton}
                style={{ backgroundColor: "#adb5bd" }}
                onClick={onRollBack}
              >
                <i
                  className="fa-solid fa-arrow-rotate-left fa-2xl"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
              {load && t("rollback")}
            </div>
          )}
          <div className={styles.exerciseButtonContainer}>
            <div
              className={styles.exerciseButton}
              style={{ backgroundColor: load ? "#FF0909" : "black" }}
              onClick={
                load
                  ? () => {
                      onAction("failure")
                    }
                  : onLeft
              }
            >
              <i
                className={
                  load
                    ? "fa-solid fa-xmark fa-2xl"
                    : "fa-solid fa-arrow-left fa-2xl"
                }
                style={{ color: "#ffffff" }}
              ></i>
            </div>
            {load && t("notToday")}
          </div>
        </div>

        <div className={`${styles.exerciseCard}`}>
          <div
            className={transition}
            style={{ opacity: transitionVisibility }}
          ></div>
          <div
            className={styles.transitionContent}
            style={{ display: transitionContentVisibility }}
          >
            <div className={styles.actionCircle}>
              <div className={styles.actionContainer}>
                <i className={actionIcon} style={{ color: "black" }}></i>
              </div>
            </div>
            {t(actionMessage)}
          </div>
          {lengthArray.map((i) => (
            <div
              className={`${styles.card} ${styles.contentContainer} ${cardAnimations[i]}`}
              key={i}
              style={cardStyles[i]}
            >
              <h1>
                {t(session.exerciseList[i].exercise.name)
                  .charAt(0)
                  .toUpperCase() +
                  t(session.exerciseList[i].exercise.name).slice(1)}
              </h1>
              <div className={styles.itemContainer}>
                <div className={styles.iconContainer}>
                  {load ? (
                    <i
                      className="fa-solid fa-circle-info fa-2xl"
                      style={{ color: "#0989ff" }}
                    ></i>
                  ) : (
                    <img src="/images/strength.png" alt="" />
                  )}
                </div>
                <span key={i} className={styles.item}>
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
                    className="fa-solid fa-clipboard-question fa-2xl"
                    style={{ color: "#0989ff" }}
                  ></i>
                </div>
                <span className={styles.item}>
                  {session.exerciseList[i].reps} {t("reps")}
                </span>
              </div>
              <div className={`${styles.itemContainer} ${styles.dumbbell}`}>
                <div className={styles.iconContainer}>
                  <i
                    className="fa-solid fa-dumbbell fa-2xl"
                    style={{ color: "#0989ff" }}
                  ></i>
                </div>
                <span className={styles.item}>
                  {session.exerciseList[i].sets > 1
                    ? `${session.exerciseList[i].sets} sets`
                    : `${session.exerciseList[i].sets} set`}
                </span>
              </div>
              <div className={styles.imgContainer}>
                <img
                  src={`/images/${session.exerciseList[i].exercise.image}`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.rightButtons}>
          <div className={styles.exerciseButtonContainer}>
            {" "}
            <div
              className={styles.exerciseButton}
              style={{ backgroundColor: "#0989ff", opacity: 1 }}
            >
              <i
                className="fa-solid fa-arrows-rotate fa-2xl"
                style={{ color: "#ffffff" }}
              ></i>
            </div>
            {t("swap")}
          </div>
          <div className={styles.exerciseButtonContainer}>
            <div
              className={styles.exerciseButton}
              style={{ backgroundColor: load ? "#198038" : "black" }}
              onClick={
                load
                  ? () => {
                      onAction("success")
                    }
                  : onRight
              }
            >
              <i
                className={
                  load
                    ? "fa-solid fa-check fa-2xl"
                    : "fa-solid fa-arrow-right fa-2xl"
                }
                style={{ color: "#ffffff" }}
              ></i>
            </div>
            {load && t("success")}
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
        <button
          className={`${styles.button} ${styles.backButton}`}
          onClick={onBack}
        >
          {selectedAction ? t("dontSave") : t("goBack")}
        </button>
        <button
          className={`${styles.button} ${styles.startButton}`}
          onClick={onStart}
        >
          {selectedAction ? t("save") : t("start")}
        </button>
      </div>
    </div>
  )
}

export default ExerciseSwap
