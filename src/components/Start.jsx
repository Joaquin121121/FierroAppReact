import React, { useState } from 'react'
import styles from '../styles/StartLight.module.css'
import Welcome from './Welcome.jsx'
import New from "./New.jsx"
import Display from "./Display.jsx"


function Start({ userdata }) {

    const [page, setPage] = useState("welcome")
    const [mouseDown, setMouseDown] = useState(false)
    const [plan, setPlan] = useState({})

    const onMouseUp = () => {
        setMouseDown(false)
    }


  return (
<div className={`container ${styles.container}`} onMouseUp={onMouseUp}>
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
                {userdata.name || "Joaquin121"}
            </div>
        </div>
    </div>
        {
            page === "welcome" && (
                <Welcome setPage={setPage} />
            )
        }
        {
            page === "new" && (
                <New setPage={setPage} mouseDown={mouseDown} setMouseDown={setMouseDown} setPlan={setPlan}/>
            )
        }
        {
            page === "display" && (
                <Display plan={plan}/>
            )
        }
</div>

  )
}

export default Start
