import React, { useContext, useState, useEffect } from "react"
import styles from "../styles/Premade.module.css"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import createPlan from "../services/planService"
import { db, auth } from "../services/firebase"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"
import { doc, updateDoc } from "firebase/firestore"

function Premade({ animation, navigate, selectedAction }) {
  Chart.register(ArcElement, Tooltip, Legend)

  const muscleGroups = [
    "chest",
    "back",
    "legs",
    "shoulders",
    "biceps",
    "triceps",
    "forearms",
  ]
  const initialSliders = [4, 4, 4, 3, 3, 3, 1]
  const upperBodySliders = [4, 4, 0, 4, 4, 4, 2]
  const lowerBodySliders = [2, 2, 14, 1, 2, 1, 0]

  const colors = [
    "#4C90FF",
    "#FF5C5C",
    "#FF87B3",
    "#FFC66B",
    "#B2FF5C",
    "#5CDBFF",
    "#5C5CFF",
  ]
  const exercisesPartialTotal = 22

  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const [sliders, setSliders] = useState(initialSliders)
  const [premadePlan, setPremadePlan] = useState("balanced")
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState("balanced")

  const data = {
    labels: muscleGroups.map(
      (e) => t(e).charAt(0).toUpperCase() + t(e).slice(1)
    ),
    datasets: [
      {
        data: sliders,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  }
  const options = {
    responsive: true,
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (acc, curr) => acc + curr,
              0
            )
            const value = context.raw
            const percentage = Math.round((value / total) * 100).toFixed(0)
            return `${percentage}%`
          },
        },
      },
    },
  }

  const onBalanced = () => {
    setSelected("balanced")
    setSliders(initialSliders)
  }

  const onLower = () => {
    setSelected("lowerBody")
    setSliders(lowerBodySliders)
  }

  const onUpper = () => {
    setSelected("upperBody")
    setSliders(upperBodySliders)
  }

  const onGo = async () => {
    setLoading(true)
    const docRef = doc(db, "userdata", auth.currentUser.uid)
    const plan = createPlan(user.plan.sessions, user.plan.duration, sliders)
    setUser({ ...user, plan: plan })
    await updateDoc(docRef, { plan: plan })
    setLoading(false)
    navigate(selectedAction ? "main" : "display")
  }

  const onBack = () => {
    navigate("planChoice")
  }

  return (
    <div className={`${styles.card} ${animation}`}>
      <h1 className={styles.h1}>Choose Your Plan</h1>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h1>Premade Plans</h1>
          <div className={styles.planContainer}>
            <div
              className={`${styles.premadePlan} ${
                selected === "balanced" ? styles.selected : ""
              }`}
              onClick={onBalanced}
            >
              <div className={styles.animationContainer}></div>
              <h1>{t("balanced")}</h1>
            </div>
            <div
              className={`${styles.premadePlan} ${
                selected === "upperBody" ? styles.selected : ""
              }`}
              onClick={onUpper}
            >
              <div className={styles.animationContainer}></div>
              <h1>{t("upperBody")}</h1>
            </div>
            <div
              className={`${styles.premadePlan} ${
                selected === "lowerBody" ? styles.selected : ""
              }`}
              onClick={onLower}
            >
              <div className={styles.animationContainer}></div>
              <h1>{t("lowerBody")}</h1>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h1>Exercise Distribution</h1>
          <div className={styles.chartContainer}>
            <Doughnut data={data} options={options}></Doughnut>
            <img src="images/icon-blue.png" alt="" />
            <div className={styles.labels}>
              {colors.map((e, i) => (
                <div className={styles.label}>
                  <div style={{ backgroundColor: e }}></div>
                  {t(muscleGroups[i])}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={`${styles.button} ${styles.leave}`} onClick={onBack}>
          Go Back
        </button>
        {loading && (
          <div className={styles.loadingAnimation}>
            <img src="images/loading-animation.gif" alt="" />
          </div>
        )}
        <button className={`${styles.button} ${styles.save}`} onClick={onGo}>
          Let´s Go!
        </button>
      </div>
    </div>
  )
}

export default Premade
