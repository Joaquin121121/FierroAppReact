import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/Frequency.module.css"
import TranslationContext from "../contexts/TranslationContext"
import Slider from "@mui/material/Slider"
import UserContext from "../contexts/UserContext"

function Frequency({ animation, navigate }) {
  const [frequency, setFrequency] = useState(3)
  const [duration, setDuration] = useState(60)

  const t = useContext(TranslationContext)
  const { user, setUser } = useContext(UserContext)

  const onChange = (field, value) => {
    field === "frequency" ? setFrequency(value) : setDuration(value)
  }

  const onContinue = () => {
    setUser({ ...user, plan: { duration: duration, sessions: frequency } })
    navigate("planChoice")
  }

  const onBack = () => {
    navigate("welcome")
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className={`${styles.card} ${animation}`}>
      <h1 className={styles.h1}>{t("tellUs")}</h1>
      <div className={styles.mainContainer}>
        <h1>Frequency</h1>
        <div className={styles.rightContainer}>
          <div className={styles.sliderContainer}>
            <div className={styles.slider}>
              <Slider
                value={frequency}
                min={2}
                max={5}
                onChange={(_, value) => onChange("frequency", value)}
                sx={{
                  color: "#0989FF", // Set the color of the selected portion
                  "& .MuiSlider-track": {
                    backgroundColor: "#0989FF", // Main color for the selected portion
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#0989FF", // Main color with lower opacity for the remaining portion
                    opacity: 0.3,
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#0989FF", // Customize the thumb color if needed
                  },
                }}
              ></Slider>
            </div>

            <p className={styles.p}>
              <span className={styles.span}>&nbsp;&nbsp;{frequency}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {t("weeklySessions")}
            </p>
          </div>
          <div className={styles.sliderContainer}>
            <div className={styles.slider}>
              <Slider
                value={duration}
                min={40}
                max={120}
                onChange={(_, value) => onChange("duration", value)}
                step={10}
                sx={{
                  color: "#0989FF", // Set the color of the selected portion
                  "& .MuiSlider-track": {
                    backgroundColor: "#0989FF", // Main color for the selected portion
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#0989FF", // Main color with lower opacity for the remaining portion
                    opacity: 0.3,
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#0989FF", // Customize the thumb color if needed
                  },
                }}
              ></Slider>
            </div>

            <p className={styles.p}>
              <span className={styles.span}>{duration}</span>&nbsp;
              {t("minutesPerSession")}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          style={{ backgroundColor: "#adb5bd" }}
          onClick={onBack}
        >
          {t("goBack")}
        </button>
        <button
          className={styles.button}
          style={{ backgroundColor: "#00A859" }}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Frequency
