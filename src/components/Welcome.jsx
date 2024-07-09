import React from 'react'
import styles from "../styles/Welcome.module.css"


function Welcome({ setPage }) {

    const onNew = () =>{
        setPage("new")
    }

  return (
    <div className={styles.card}>
            <h1>Bienvenido a la <span className={styles.bold}>Fierro App</span></h1>
            <h2>Motivación constante, resultados reales</h2>
            <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.welcomeContainer} ${styles.newContainer}`} onClick={onNew}>
                <div className={styles.sumContainer}>
                    <div className={styles.sumHorizontal}></div>
                    <div className={styles.sumVertical}></div>
                </div>
                <h1>Crear plan</h1>
                <div className={styles.imageContainer}>
                    <img src="images/JUNIOR.webp" alt="" />
                </div>
            </button>
            <button className={`${styles.button} ${styles.welcomeContainer} ${styles.uploadContainer}`} >
                <div className={styles.secondaryUploadContainer}>
                    <img src="images/UPLOAD.svg" alt="" />
                </div>
                <h1>Cargar plan</h1>
                <div className={styles.imageContainer} style={{ marginBottom: '20px' }}>
                    <img src="images/HAPPY-EDDIE.gif" alt="" />
                </div>
            </button>
            </div>
            
    </div>
  )
}

export default Welcome
