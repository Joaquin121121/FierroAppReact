import React, { useEffect, useState } from 'react'
import styles from "../styles/ExerciseSwap.module.css"

function ExerciseSwap({ session, n, t, setPage, setScrolled }) {
    const length = session.exerciseList.length
    const [exerciseN, setExerciseN] = useState(0)
    const [animation, setAnimation] = useState(styles.fadeInLeft)

    const onLeft = () => {
        setAnimation(styles.fadeOutLeft)
        setTimeout(() => {
            setExerciseN(index => {
                if(index === 0) return length - 1
                return index - 1
            })
            setAnimation(styles.fadeInRight)
        }, 250)
    }

    const onRight = () => {
        setAnimation(styles.fadeOutRight)
        setTimeout(() => {
            setExerciseN(index => {
                if(index === (length - 1)) return 0
                return index + 1
            })
            setAnimation(styles.fadeInLeft)
        }, 250)
    }

    const onBack = () => {
        setScrolled(true)
        setPage("display")
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <div className={styles.card}>
            <h1>{t("session")} {n} - <span className={styles.span}>{t("exercises").charAt(0).toUpperCase() + t("exercises").slice(1)}</span></h1>
            <div className={styles.parentContainer}>
                <div className={styles.leftButtons}>
                    <div className={styles.exerciseButton} style={{ backgroundColor: 'black' }} onClick={onLeft}>
                        <i className="fa-solid fa-arrow-left fa-2xl" style={{ color: '#ffffff' }}></i>
                    </div>
                </div>
                <div className={`${styles.card} ${styles.exerciseCard} ${animation}`}>
                    <h1>{(t(session.exerciseList[exerciseN].exercise.name).charAt(0).toUpperCase() + t(session.exerciseList[exerciseN].exercise.name).slice(1))}</h1>
                    <div className={styles.itemContainer}>
                        <div className={styles.iconContainer}>
                            <img src="images/strength.png" alt="" />
                        </div>
                        {session.exerciseList[exerciseN].exercise.targetedMuscles.map((muscle, i) => (
                            <span key={i}>
                                {(t(muscle).charAt(0).toUpperCase() + t(muscle).slice(1)) + (i + 1 === session.exerciseList[exerciseN].exercise.targetedMuscles.length ? "" : ", ")}
                            </span>
                        ))}
                    </div>
                    <div className={styles.itemContainer}>
                        <div className={styles.iconContainer}>
                            <i className="fa-solid fa-clipboard-question fa-xl" style={{ color: '#0989ff' }}></i>
                        </div>
                        {session.exerciseList[exerciseN].reps} {t("reps")}
                    </div>
                    <div className={`${styles.itemContainer} ${styles.dumbbell}`}>
                        <div className={styles.iconContainer}>
                            <i className="fa-solid fa-dumbbell fa-xl" style={{ color: '#0989ff' }}></i>
                        </div>
                        {session.exerciseList[exerciseN].sets > 1 ? `${session.exerciseList[exerciseN].sets} sets` : `${session.exerciseList[exerciseN].sets} set`}
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={`images/${session.exerciseList[exerciseN].exercise.image}`} alt="" />
                    </div>
                </div>
                <div className={styles.rightButtons}>
                    <div className={styles.exerciseButton} style={{ backgroundColor: '#0989ff', opacity: 1 }}>
                        <i className="fa-solid fa-arrows-rotate fa-2xl" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div className={styles.exerciseButton} style={{ backgroundColor: 'black' }} onClick={onRight}>
                        <i className="fa-solid fa-arrow-right fa-2xl" style={{ color: '#ffffff' }}></i>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.backButton} onClick={onBack}>
                    {t("back")}
                </button>
                <button className={styles.startButton}>
                    {t("start")}
                </button>
            </div>
        </div>
    )
}

export default ExerciseSwap
