import React, { useEffect, useState, useCallback, useContext } from "react"
import styles from "../styles/Custom.module.css"
import Slider from "@mui/material/Slider"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import CustomSlider from "./CustomSlider"
import createPlan from "../services/planService"
import { Chart } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { throttle } from "lodash"
import TranslationContext from "../contexts/TranslationContext"
import { db, auth } from "../services/firebase"
import UserContext from "../contexts/UserContext"
import { updateDoc, doc } from "firebase/firestore"

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
const exercisesPartialTotal = 22

const colors = [
  "#4C90FF",
  "#FF5C5C",
  "#FF87B3",
  "#FFC66B",
  "#B2FF5C",
  "#5CDBFF",
  "#5C5CFF",
]
/*   const colors = [
    {track: "#0989FF", rail: "#45a5ff"},
    {track: "#f00", rail: "#ff4d4d"},
    {track: "#f0f", rail: "#ff4dff"},
    {track: "#ff8000", rail: "#ffa64d"},
    {track: "#ff0", rail: "#ffff4d"},
    {track: "#0f0", rail: "#4dff4d"},
    {track: "#0ff", rail: "#4dffff"}
  ] */

function New({
  mouseDown,
  setMouseDown,
  navigate,
  animation,
  setAnimation,
  selectedAction,
}) {
  const [sliders, setSliders] = useState(initialSliders)
  const [indexToIgnore, setIndexToIgnore] = useState(null)
  const [replacePointer, setReplacePointer] = useState(0)
  const [premadePlan, setPremadePlan] = useState("balanced")
  const [loading, setLoading] = useState(false)

  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

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

  const onStart = async () => {
    setLoading(true)
    const docRef = doc(db, "userdata", auth.currentUser.uid)
    const plan = createPlan(user.plan.sessions, user.plan.duration, sliders)
    setUser({ ...user, plan: plan })
    await updateDoc(docRef, { plan: plan })
    setLoading(false)
    navigate(selectedAction ? "main" : "display")
  }

  const onBack = () => {
    navigate(selectedAction ? "main" : "planChoice")
  }

  const onChange = (index, value) => {
    const currentTotal = sliders.reduce((a, b) => a + b, 0)

    let newSliders = [...sliders]
    let localPointer = replacePointer

    const difference = value - newSliders[index]
    const adjustedTotal = currentTotal + difference

    if (adjustedTotal > exercisesPartialTotal) {
      const indices = Array.from({ length: 7 }, (_, i) => i)
        .filter((i) => i !== index)
        .sort((a, b) =>
          a === indexToIgnore ? 1 : b === indexToIgnore ? -1 : 0
        )

      for (let i = 0; i < difference; i++) {
        let index = localPointer % indices.length
        let sliderIndex = indices[index]
        if (newSliders[sliderIndex] === 0) {
          i--
        } else {
          newSliders[sliderIndex]--
        }
        localPointer++
      }
    }

    newSliders[index] = value
    setSliders(newSliders)
    setIndexToIgnore(index)
    setReplacePointer(localPointer)
  }

  const throttledOnChange = useCallback(
    throttle(onChange, 450),
    [sliders],
    [onChange, sliders]
  )

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
    if (sliders === initialSliders) {
      setPremadePlan("balanced")
    } else if (sliders === upperBodySliders) {
      setPremadePlan("upper")
    } else if (sliders === lowerBodySliders) {
      setPremadePlan("lower")
    } else {
      setPremadePlan("")
    }
  }, [sliders])

  return (
    <div
      className={`card ${styles.card} ${animation}`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <div className={styles.create}>
        <h1 className={styles.h1}>{t("tellUs")}</h1>
      </div>
      <div className={styles.goalContainer}>
        <h1>{t("goal")}</h1>
        <div style={{ width: "40%", marginTop: "20px" }}>
          {sliders.map((value, i) => (
            <div key={i} className={styles.sliderContainer}>
              <h2 className={styles.h2}>
                {t(muscleGroups[i]).charAt(0).toUpperCase() +
                  t(muscleGroups[i]).slice(1)}
              </h2>
              <Slider
                value={value}
                min={0}
                max={exercisesPartialTotal}
                onChange={(_, value) => throttledOnChange(i, value)}
                sx={{
                  "& .MuiSlider-track": {
                    background: colors[i],
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: colors[i],
                    border: "none",
                  },
                }}
              ></Slider>
            </div>
          ))}
        </div>
        <div className={styles.chartContainer}>
          <h1>{t("exerciseDistribution")}</h1>
          <Doughnut
            style={{ zIndex: 1 }}
            data={data}
            options={options}
          ></Doughnut>
          <img src="/images/icon-blue.png" alt="" />
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.backButton}`}
          onClick={onBack}
        >
          {selectedAction ? t("dontSave") : t("goBack")}
        </button>
        <div
          className={styles.loadingAnimation}
          style={{ display: loading ? "block" : "none" }}
        >
          <img src="/images/loading-animation.gif" alt="loading-animation" />
        </div>
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

export default New
