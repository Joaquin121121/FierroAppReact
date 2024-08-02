import React, { useContext, useState } from "react"
import styles from "../styles/Main.module.css"
import MainContent from "./MainContent"
import PlanContent from "./PlanContent"
import TranslationContext from "../contexts/TranslationContext"

function Main() {
  const t = useContext(TranslationContext)

  const [action, setAction] = useState("plan")

  return (
    <div className={`container-fluid d-flex ${styles.containerFluid}`}>
      <div className={`card ${styles.card} ${styles.card1}`}>
        <div className={styles.header}>
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: "black" }}
          >
            <i
              className={`icon fa-solid fa-dumbbell fa-2xl`}
              style={{ color: "#ffffff", transform: "rotate(135deg)" }}
            ></i>
          </div>
          <div className={styles.brand}>
            <h1>Fierro App</h1>
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-house fa-xl"></i>
            </div>
            <h6>{t("home")}</h6>
          </div>
          <div className={styles.button}>
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-dumbbell fa-xl"></i>
            </div>
            <h6>{t("logSession")}</h6>
          </div>
          <div className={styles.button}>
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-calendar-days fa-xl"></i>
            </div>
            <h6>{t("calendar")}</h6>
          </div>
          <div className={styles.button}>
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-clipboard-list fa-xl"></i>
            </div>
            <h6>{t("plan")}</h6>
            <div className={styles.extra}>
              <div className={styles.iconContainer}>
                <i className="fa-solid fa-pencil fa-md"></i>
              </div>
              <div className={styles.plans}>
                <p>4</p>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <div className={styles.iconContainer}>
              <i className="fa-solid fa-chart-simple fa-xl"></i>
            </div>
            <h6>{t("myStats")}</h6>
          </div>
        </div>
      </div>
      <div className={styles.cardsRight}>
        {action !== "plan" && (
          <div className={styles.top}>
            <div className={`card ${styles.card} ${styles.card2}`}>
              <h1>{t("myWeek")}</h1>
              <div className={styles.middleContainer}>
                <div className={styles.externalSessionsContainer}>
                  <div className={styles.internalSessionsContainer}>
                    <div className={styles.textContainer}>
                      <h1>1/3</h1>
                      {t("completedSessions")}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.progressContainer}>
                <div className={styles.progress}>
                  <div
                    className={`progress-bar progress-bar-striped progress-bar-animated bg-success ${styles.weeklyProgress}`}
                  ></div>
                </div>
              </div>
            </div>
            <div className={`card ${styles.card} ${styles.card3}`}>
              <div className={styles.textContainer}>
                <span className={styles.streak}>50</span>
                <h1 style={{ textAlign: "left" }}>{t("streakDays")}</h1>
              </div>
              <div className={styles.imageContainer}>
                <img src="Images/streak.png" alt="" />
              </div>
            </div>
          </div>
        )}
        {action === "main" ? (
          <div className={`card ${styles.card} ${styles.card4}`}>
            <MainContent></MainContent>
          </div>
        ) : action === "plan" ? (
          <PlanContent></PlanContent>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Main
