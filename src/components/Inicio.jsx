import React, { useState } from 'react'
import styles from '../styles/Inicio.module.css'
import Welcome from './Welcome.jsx'
import New from "./New.jsx"


function Inicio({ userdata }) {

    const [page, setPage] = useState("Welcome")

  return (
<div className={`container ${styles.container}`}>
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
                Juani
            </div>
        </div>
    </div>
        {
            page === "Welcome" && (
                <Welcome setPage={setPage} />
            )
        }
        {
            page === "New" && (
                <New setPage={setPage}/>
            )
        }
</div>

  )
}

export default Inicio
