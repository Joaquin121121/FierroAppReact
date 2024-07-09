import React, { useEffect, useState, useRef } from 'react'
import styles from "../styles/New.module.css"
import Slider from "./Slider"
import createPlan from "../services/planService"



function New({ mouseDown, setMouseDown, setPage, setPlan, t}) {

    const [duration, setDuration] = useState(40)
    const [frequency, setFrequency] = useState(3)
    const [goal, setGoal] = useState("hyperthrophy")
    const hyperthrophyRef = useRef(null)
    const strengthRef = useRef(null)
    const functionalRef = useRef(null)

    const onStart = () => {
        setPlan(createPlan(frequency, duration, goal))
        console.log(createPlan(frequency, duration, goal))
        setPage("display")
    }

    useEffect(() => {

        if (hyperthrophyRef.current) hyperthrophyRef.current.style.border = "none";
        if (strengthRef.current) strengthRef.current.style.border = "none";
        if (functionalRef.current) functionalRef.current.style.border = "none";
        
        switch(goal) {
          case "strength":
            if (strengthRef.current) {
              strengthRef.current.style.borderColor = "#0989FF"
              strengthRef.current.style.borderWidth = "4px"
              strengthRef.current.style.borderStyle = "solid"
            }
            break
          case "hyperthrophy":
            if (hyperthrophyRef.current) {
              hyperthrophyRef.current.style.borderColor = "#0989FF"
              hyperthrophyRef.current.style.borderWidth = "4px"
              hyperthrophyRef.current.style.borderStyle = "solid"
            }
            break
          case "functional":
            if (functionalRef.current) {
              functionalRef.current.style.borderColor = "#0989FF"
              functionalRef.current.style.borderWidth = "4px"
              functionalRef.current.style.borderStyle = "solid"
            }
            break
          default:
            break
        }
      }, [goal])


  return (
<div className={`card ${styles.card}`}>
    <div className={styles.create}>
        <h1>{t("tellUs")}</h1>
    </div>
    <div className={styles.frequencyContainer}>
        <h1>{t("frequency")}</h1>
        <div className={styles.sliders} onMouseLeave={() =>{setMouseDown(false)}}>
            <Slider field="frequency" mouseDown={mouseDown} setMouseDown={setMouseDown} counter={frequency} setCounter={setFrequency} t={t}/>
            <Slider field="duration" mouseDown={mouseDown} setMouseDown={setMouseDown} counter={duration} setCounter={setDuration} t={t}/>
        </div>
    </div>
    <div className={styles.goalContainer}>
        <h1>{t("goal")}</h1>
        <div className={styles.goal} onClick={() => {setGoal("strength")}} ref={strengthRef}>
            <div className={styles.imageContainer}>
                <img src="images/strongman.png" alt="" />
            </div>
            <div className={styles.textContainer}>
                {t("strength")}
            </div>
        </div>
        <div className={styles.goal} onClick={() => {setGoal("hyperthrophy")}} ref={hyperthrophyRef}>
            <div className={styles.imageContainer}>
                <img src="images/cbum.jpg" alt="" />
            </div>
            <div className={styles.textContainer}  >
              {t("hyperthrophy")}
            </div>
        </div>
        <div className={styles.goal} onClick={() => {setGoal("functional")}} ref={functionalRef}>
            <div className={styles.imageContainer}>
                <img src="images/goggins.png" alt="" />
            </div>
            <div className={styles.textContainer}>
                {t("functional")}
            </div>
        </div>
    </div>
    <div className={styles.buttons}>
        <button className={styles.backButton} onClick={() => {setPage("welcome")}}>
            {t("back")}
        </button>
        <button className={styles.startButton} onClick={onStart}>
            {t("start")}
        </button>
    </div>
</div>


  )
}

export default New
