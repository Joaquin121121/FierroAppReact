import React from 'react'
import styles from "../styles/Welcome.module.css"


function Welcome({ setPage }) {

    const onNew = () =>{
        setPage("New")
    }

  return (
    <div className={styles.card}>
            <h1>Bienvenido a la <span className={styles.white}>Fierro App</span></h1>
            <h2>Motivación constante, resultados reales</h2>
            <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.containerWelcome} ${styles.containerNew}`} onClick={onNew}>
                <div className={styles.sumContainer}>
                    <div className={styles.sumHorizontal}></div>
                    <div className={styles.sumVertical}></div>
                </div>
                <h1>Crear plan</h1>
                <div className={styles.containerImage}>
                    <img src="images/JUNIOR.webp" alt="" />
                </div>
            </button>
            <button className={`${styles.button} ${styles.containerWelcome} ${styles.containerUpload}`} >
                <div className={styles.uploadContainer}>
                    <img src="images/UPLOAD.svg" alt="" />
                </div>
                <h1>Cargar plan</h1>
                <div className={styles.containerImage} style={{ marginBottom: '20px' }}>
                    <img src="images/HAPPY-EDDIE.gif" alt="" />
                </div>
            </button>
            </div>
            
    </div>
  )
}

export default Welcome
