import React, { useContext, useEffect, useRef, useState } from "react"
import styles from "../styles/Display.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import TranslationContext from "../contexts/TranslationContext"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { db, auth } from "../services/firebase"
import { doc, updateDoc } from "firebase/firestore"

function Display({ navigate, animation, setAnimation, setSessionN }) {
  const [cardsJSX, setCardsJSX] = useState("")
  const cardsRef = useRef([])
  const editRefs = useRef([])
  const loadedSessions = []

  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const plan = user.plan

  const onMouseEnter = (ref, i) => {
    if (loadedSessions.includes(i)) {
      ref.current.classList.add(styles.fadeUp)
      ref.current.classList.remove(styles.fadeOut)
    }
  }

  const onMouseLeave = (ref, i) => {
    if (loadedSessions.includes(i)) {
      ref.current.classList.add(styles.fadeOut)
      ref.current.classList.remove(styles.fadeUp)
    }
  }

  const onEdit = (i) => {
    setSessionN(i)
    navigate("exerciseDisplay")
  }

  const onBack = () => {
    navigate("new")
  }

  const onStart = async () => {
    const docRef = doc(db, "userdata", auth.currentUser.uid)
    await updateDoc(docRef, { ["hasPlan"]: true })
    navigate("main")
  }

  useEffect(() => {
    const loadJSX = () => {
      let img = ""
      let jsx = []

      for (let i = 1; i <= plan.sessions; i++) {
        if (plan.sessions > 3) {
          switch (plan[`session ${i}`].name) {
            case "Push Day":
              img = "/images/bench-press.webp"
              break
            case "Pull Day":
              img = "/images/pull.jpg"
              break
            case "Leg Day":
              img = "/images/legs.jpg"
              break
            case "Upper Day":
              img = "/images/full-body-3.jpg"
              break
            default:
              break
          }
        }

        cardsRef.current[i - 1] = React.createRef()
        editRefs.current[i - 1] = React.createRef()
        jsx.push(
          <div
            className={styles.sessionContainer}
            key={i}
            ref={cardsRef.current[i - 1]}
            onMouseEnter={() => {
              onMouseEnter(editRefs.current[i - 1], i)
            }}
            onMouseLeave={() => {
              onMouseLeave(editRefs.current[i - 1], i)
            }}
          >
            <div
              className={styles.session}
              style={{
                animationDelay: `${i + 1}s`,
              }}
            >
              <div className={styles.imageContainer}>
                <img src={img || `/images/full-body-${i}.jpg`} alt="" />
              </div>
              <div className={styles.textContainer}>
                <h1>
                  {t("session")} {i}
                </h1>
                <div className={styles.itemContainer}>
                  <div className={styles.iconContainer}>
                    <i
                      className="fa-regular fa-clock fa-xl"
                      style={{ color: "#0989ff" }}
                    ></i>
                  </div>
                  {plan.duration} {t("minutes")}
                </div>
                <div className={styles.itemContainer}>
                  <div className={styles.iconContainer}>
                    <i
                      className="fa-solid fa-clipboard-question fa-xl"
                      style={{ color: "#0989ff" }}
                    ></i>
                  </div>
                  {plan[`session ${i}`].name || "Full Body"}
                </div>
                <div className={styles.itemContainer}>
                  <div className={styles.iconContainer}>
                    <i
                      className="fa-regular fa-clock fa-xl"
                      id="clock-icon"
                      style={{ color: "#0989ff" }}
                    ></i>
                  </div>
                  {plan[`session ${i}`].nExercises} {t("exercises")}
                </div>
              </div>
            </div>
            <div
              className={styles.editContainer}
              ref={editRefs.current[i - 1]}
              onClick={() => {
                onEdit(i)
              }}
            >
              <div className={styles.edit}>
                <i
                  className="fa-solid fa-pen fa-xl"
                  style={{ color: "white" }}
                ></i>
              </div>
              {t("sessionEdit")} {i}
            </div>
          </div>
        )

        setTimeout(() => {
          loadedSessions.push(i)
        }, (i + 1) * 1000)
      }

      jsx.push(
        <div
          className={styles.buttonsContainer}
          key="buttons-container"
          style={{ animationDelay: `${plan.sessions + 1}s` }}
        >
          <button
            className={`${styles.button} ${styles.returnButton}`}
            onClick={onBack}
          >
            {t("goBack")}
          </button>
          <button
            className={`${styles.button} ${styles.startButton}`}
            onClick={onStart}
          >
            {t("start")}
          </button>
        </div>
      )

      return jsx
    }
    setCardsJSX(loadJSX())
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
  useEffect(() => {
    cardsRef.current.forEach((ref, index) => {
      if (ref && ref.current) {
        setTimeout(() => {
          if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" })
          }
        }, index * 1000 + 3000)
      }
    })
  }, [cardsJSX])
  return (
    <div
      className={`${styles.card} ${animation}`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <h1>
        {t("myPlan")}
        <span className={styles.span}>{plan.name}</span>
      </h1>
      {cardsJSX}
    </div>
  )
}

export default Display
