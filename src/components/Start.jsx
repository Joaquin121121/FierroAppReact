import React, { useState } from 'react'
import styles from '../styles/StartLight.module.css'
import Welcome from './Welcome.jsx'
import New from "./New.jsx"
import Display from "./Display.jsx"
import ExerciseSwap from './ExerciseSwap.jsx'
import { useTranslation } from 'react-i18next';


function Start({ userdata }) {

    const [page, setPage] = useState("welcome")
    const [mouseDown, setMouseDown] = useState(false)
    const [plan, setPlan] = useState({})
    const [sessionN, setSessionN] = useState(0)
    const [scrolled, setScrolled] = useState(false)
 
    const onMouseUp = () => {
        setMouseDown(false)
    }

    const { t } = useTranslation()


  return (
<div className={`container ${styles.container}`} onMouseUp={onMouseUp} >
    <div className={styles.header}>
        <div className={styles.brand}>
            <div className={styles.iconContainer}>
                <i className={`${styles.icon} fa-solid fa-dumbbell fa-2xl`} style={{ color: "#ffffff" }}></i>
            </div>
            <h1>Fierro App</h1>
        </div>
        <div className={styles.user}>
            <i className={`${styles.userIcon} fa-solid fa-user fa-2xl`}></i>
            <div className={styles.text} id="user">
                {(userdata) ? userdata.name || "Joaquin121" : "Joaquin121"}
            </div>
        </div>
    </div>
        {
            page === "welcome" && (
                <Welcome setPage={setPage} t={t} />
            )
        }
        {
            page === "new" && (
                <New setPage={setPage} mouseDown={mouseDown} setMouseDown={setMouseDown} setPlan={setPlan} t={t}/>
            )
        }
        {
            page === "display" && (
                <Display plan={plan} t={t} setPage={setPage} setSessionN={setSessionN} scrolled={scrolled} setScrolled={setScrolled}/>
            )
        }
        {
            page === "exerciseSwap" && (
                <ExerciseSwap session={plan[`session ${sessionN}`]} n={sessionN} t={t} setPage={setPage} setScrolled={setScrolled} />
            )
        }
</div>

  )
}

export default Start
