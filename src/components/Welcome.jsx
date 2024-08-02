import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Welcome.module.css"
import navAnimations from "../styles/NavAnimations.module.css"
import TranslationContext from "../contexts/TranslationContext"
import { auth } from "../services/firebase"
function Welcome({ setPage, prevPage, setPrevPage }) {
  const [cardAnimation, setCardAnimation] = useState(
    prevPage === "new" ? navAnimations.fadeInLeft : navAnimations.fadeInRight
  )

  const t = useContext(TranslationContext)

  const onNew = () => {
    setPrevPage("welcome")
    setCardAnimation(navAnimations.fadeOutLeft)
    setTimeout(() => {
      setPage("new")
    }, 500)
  }

  const onHover = (e) => {
    if (e._reactName === "onMouseEnter") {
      setCardAnimation(styles.hover)
    } else {
      setCardAnimation("")
    }
  }

  useEffect(() => {
    console.log(auth.currentUser.uid)
  })
  return (
    <div
      className={`${styles.card} ${cardAnimation}`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <h1>
        {t("welcomeTo")} <span className={styles.bold}>Fierro App</span>
      </h1>
      <h2>{t("welcomeSubheading")}</h2>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.welcomeContainer} ${styles.newContainer}`}
          onClick={onNew}
        >
          <div className={styles.sumContainer}>
            <div className={styles.sumHorizontal}></div>
            <div className={styles.sumVertical}></div>
          </div>
          <h1>{t("create")}</h1>
          <div className={styles.imageContainer}>
            <img src="images/JUNIOR.webp" alt="" />
          </div>
        </button>
        <button
          className={`${styles.button} ${styles.welcomeContainer} ${styles.uploadContainer}`}
        >
          <div className={styles.secondaryUploadContainer}>
            <img src="images/UPLOAD.svg" alt="" />
          </div>
          <h1>{t("load")}</h1>
          <div
            className={styles.imageContainer}
            style={{ marginBottom: "20px" }}
          >
            <img src="images/HAPPY-EDDIE.gif" alt="" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Welcome
