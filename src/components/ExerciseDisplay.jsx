import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/ExerciseDisplay.module.css"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"

function ExerciseDisplay({
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
  const { user } = useContext(UserContext)

  const processedN = parseInt(n.toString().charAt(0))
  const session = user.plan[`session ${processedN}`]
  const length = session.exerciseList.length
  const lengthArray = Array.from({ length }, (_, i) => i)
  const actionTimeouts = []
  const initialCardStyles = lengthArray.map((i) => {
    return {
      zIndex: length - i,
    }
  })
  const initialCardAnimations = Array.from({ length }, () => "")

  const [exerciseN, setExerciseN] = useState(0)
  const [transition, setTransition] = useState("")
  const [transitionVisibility, setTransitionVisibility] = useState(
    Array.from({ length }, () => 0)
  )
  const [transitionContentVisibility, setTransitionContentVisibility] =
    useState(Array.from({ length }, () => "none"))
  const [transitionFlag, setTransitionFlag] = useState(false)
  const [actionIcon, setActionIcon] = useState("")
  const [actionMessage, setActionMessage] = useState("")
  const [cardStyles, setCardStyles] = useState(initialCardStyles)
  const [cardAnimations, setCardAnimations] = useState(initialCardAnimations)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const onLeft = () => {
    if (exerciseN === 0) {
      setCardAnimations(
        cardAnimations.map((_, i) => (i === length - 1 ? styles.enter : ""))
      )
    } else {
      setCardAnimations(
        cardAnimations.map((_, i) => (i === exerciseN - 1 ? styles.enter : ""))
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
      setExerciseN((index) => {
        if (index === length - 1) {
          if (load) {
            navigate("main")
          } else {
            setCardAnimations(Array.from({ length }, () => styles.enter))
            setCardStyles(initialCardStyles)
            return 0
          }
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
      setTransitionVisibility(
        transitionVisibility.map((_, i) => (i === exerciseN ? 1 : 0))
      )
      actionTimeouts.push([
        setTimeout(() => {
          setTransitionContentVisibility(
            transitionContentVisibility.map((_, i) =>
              i === exerciseN ? "flex" : "none"
            )
          )
          setActionIcon(
            `fa-solid fa-${action === "success" ? "check" : "xmark"} fa-2xl`
          )
          setActionMessage(`${action}Message`)
        }, 750),
        setTimeout(() => {
          onRight()
        }, 1500),
        setTimeout(() => {
          setTransitionVisibility(transitionVisibility.map(() => 0))
          setTransitionContentVisibility(
            transitionContentVisibility.map(() => "none")
          )
          setTransition(`${styles.transition} ${styles[action]}`)
        }, 2000),
        setTimeout(() => {
          setTransitionFlag(false)
        }, 2250),
      ])
    }
  }

  const onJumpToExercise = (n) => {
    switch (n - exerciseN) {
      case -1:
        onLeft()
        break
      case 0:
        break
      case 1:
        onRight()
        break
      default:
        if (n - exerciseN > 1) {
          if (!isTransitioning) {
            setIsTransitioning(true)
            setCardAnimations(
              cardAnimations.map((e, i) =>
                i >= exerciseN && i < n ? styles.leave : ""
              )
            )
            setTimeout(() => {
              if (n - exerciseN > 4) {
                setCardStyles(initialCardStyles)
              }
              setExerciseN(n)
              setIsTransitioning(false)
            }, 500)
          }
        } else {
          setCardAnimations(
            cardAnimations.map((e, i) =>
              i >= n && i < exerciseN ? styles.enter : ""
            )
          )
          setExerciseN(n)
        }
        break
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

  useEffect(() => {
    setCardStyles(
      cardStyles.map((e, i) => ({
        ...e,
        translate:
          i >= exerciseN && i < exerciseN + 5
            ? `${(i - exerciseN) * 15}px ${(exerciseN - i) * 5}px`
            : "",
        zIndex: i >= exerciseN && i < exerciseN + 5 ? length - i : -1,
        opacity: i >= exerciseN && i < exerciseN + 5 ? 1 : 0,
        display: i >= exerciseN && i < exerciseN + 5 ? "flex" : "none",
      }))
    )
  }, [exerciseN])

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
          {lengthArray.map((i) => (
            <div
              className={`${styles.card} ${styles.contentContainer} ${cardAnimations[i]}`}
              key={i}
              style={cardStyles[i]}
            >
              <div
                className={transitionVisibility[i] === 1 ? transition : ""}
                style={{ ...cardStyles[i], opacity: transitionVisibility[i] }}
              ></div>
              <div
                className={styles.transitionContent}
                style={{
                  ...cardStyles[i],
                  display: transitionContentVisibility[i],
                }}
              >
                <div className={styles.actionCircle}>
                  <div className={styles.actionContainer}>
                    <i className={actionIcon} style={{ color: "black" }}></i>
                  </div>
                </div>
                {t(actionMessage)}
              </div>
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
              onClick={() => {
                navigate("ExerciseSwap")
              }}
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
                if (!load) {
                  onJumpToExercise(i)
                }
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

export default ExerciseDisplay
