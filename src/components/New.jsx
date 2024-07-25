import React, { useEffect, useState, useCallback } from "react"
import styles from "../styles/New.module.css"
import Slider from "@mui/material/Slider"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import CustomSlider from "./CustomSlider"
import createPlan from "../services/planService"
import navAnimations from "../styles/NavAnimations.module.css"
import { Chart } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { throttle } from "lodash"

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
  setPage,
  setPlan,
  t,
  prevPage,
  setPrevPage,
}) {
  const [duration, setDuration] = useState(40)
  const [frequency, setFrequency] = useState(3)
  const [animation, setAnimation] = useState("")
  const [sliders, setSliders] = useState(initialSliders)
  const [indexToIgnore, setIndexToIgnore] = useState(null)
  const [replacePointer, setReplacePointer] = useState(0)
  const [premadePlan, setPremadePlan] = useState("balanced")

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

  const onPlan = (plan) => {
    switch (plan) {
      case "balanced":
        setSliders(initialSliders)
        break
      case "upper":
        setSliders(upperBodySliders)
        break
      case "lower":
        setSliders(lowerBodySliders)
        break
      default:
        break
    }
  }

  const onStart = () => {
    setPlan(createPlan(frequency, duration, sliders))
    console.log(createPlan(frequency, duration, sliders))
    setPrevPage("new")
    setAnimation(navAnimations.fadeOutLeft)
    setTimeout(() => {
      setPage("display")
    }, 500)
  }

  const onBack = () => {
    setPrevPage("new")
    setAnimation(navAnimations.fadeOutRight)
    setTimeout(() => {
      setPage("welcome")
    }, 500)
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

  useEffect(() => {
    if (prevPage === "welcome") {
      setAnimation(navAnimations.fadeInRight)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setAnimation(navAnimations.fadeInLeft)
    }
  }, [])

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
    <div className={`${animation} card ${styles.card} `}>
      <div className={styles.create}>
        <h1>{t("tellUs")}</h1>
      </div>
      <div className={styles.frequencyContainer}>
        <h1>{t("frequency")}</h1>
        <div
          className={styles.sliders}
          onMouseLeave={() => {
            setMouseDown(false)
          }}
        >
          <CustomSlider
            field="frequency"
            mouseDown={mouseDown}
            setMouseDown={setMouseDown}
            counter={frequency}
            setCounter={setFrequency}
            t={t}
          />
          <CustomSlider
            field="duration"
            mouseDown={mouseDown}
            setMouseDown={setMouseDown}
            counter={duration}
            setCounter={setDuration}
            t={t}
          />
        </div>
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
            data={data}
            options={{ cutout: "80%", plugins: { legend: { display: false } } }}
          ></Doughnut>
          <img src="images/icon-blue.png" alt="" />
        </div>
      </div>
      <div className={styles.plansContainer}>
        <div
          className={
            premadePlan === "balanced"
              ? `${styles.plan} ${styles.selected}`
              : styles.plan
          }
          onClick={() => {
            onPlan("balanced")
          }}
        >
          <div className={styles.imageContainer}>
            <img src="images/balanced-training.jpg" alt="" />
          </div>
          <div className={styles.textContainer}>{t("balanced")}</div>
        </div>
        <div
          className={
            premadePlan === "lower"
              ? `${styles.plan} ${styles.selected}`
              : styles.plan
          }
          onClick={() => {
            onPlan("lower")
          }}
        >
          <div className={styles.imageContainer}>
            <img src="images/lower-body-training.jpg" alt="" />
          </div>
          <div className={styles.textContainer}>+ {t("lowerBody")}</div>
        </div>
        <div
          className={
            premadePlan === "upper"
              ? `${styles.plan} ${styles.selected}`
              : styles.plan
          }
          onClick={() => {
            onPlan("upper")
          }}
        >
          <div className={styles.imageContainer}>
            <img src="images/upper-body-training.jpg" alt="" />
          </div>
          <div className={styles.textContainer}>+ {t("upperBody")}</div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.backButton} onClick={onBack}>
          {t("goBack")}
        </button>
        <button className={styles.startButton} onClick={onStart}>
          {t("start")}
        </button>
      </div>
    </div>
  )
}

export default New
