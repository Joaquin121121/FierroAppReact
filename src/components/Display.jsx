import React, { useEffect, useState } from 'react'
import styles from "../styles/Display.module.css"

function Display({ plan }) {

    const[cardsJSX, setCardsJSX] = useState("")



    useEffect(() => {
     
        let img = ""
        let jsx = []

        for(let i = 1; i <= plan.sessions; i++){
            if(plan.sessions > 3){
                
                switch (plan[`session ${i}`].name){
                    case "Push Day":
                        img = "PRESS-BANCA.jpg"
                        break
                    case "Pull Day":
                        img = "PULL.jpg"
                        break
                    case "Leg Day":
                        img = "LEG.jpg"
                        break
                    case "Upper Day":
                        img = "FULL_BODY_3.jpg"
                        break
                    default:
                        break
                }
            }
            jsx.push(<div className={styles.sessionContainer} style={{animationDelay : `${i + 1}s`}}>
                <div className={styles.session}>
                    <div className={styles.imageContainer}>
                        <img src={img || `./images/FULL_BODY_${i}.jpg`} alt=""/>
                    </div>
                    <div className={styles.textContainer}>
                        <h1>Sesión {i}</h1>
                        <div className={styles.itemContainer}>
                            <div className={styles.iconContainer}>
                                <i class="fa-regular fa-clock fa-xl" style={{color: "#0989ff"}}></i>
                            </div>
                            {plan.duration} minutos
                        </div>
                        <div className={styles.itemContainer}>
                            <div className={styles.iconContainer}>
                                <i class="fa-solid fa-clipboard-question fa-xl" style={{color: "#0989ff"}}></i>
                            </div>
                            {plan[`session ${i}`].name || "Full Body"}
                        </div>
                        <div className={styles.itemContainer}>
                            <div className={styles.iconContainer}>
                                <i class="fa-regular fa-clock fa-xl" id="clock-icon" style={{color: "#0989ff"}}></i>
                            </div>
                            {plan[`session ${i}`].nExercises} ejercicios
                        </div>
                    </div>
                </div>
                <div className={styles.editContainer}>
                    <div className={styles.edit}>
                        <i class="fa-solid fa-pen fa-xl" style={{color: "white;"}}></i>
                    </div>
                </div>
                Editar Sesión {i}  
            </div>)
        }
        setCardsJSX(jsx)
        
    }, [plan])

  return (
    <div className={styles.card}>
        <h1>Mi Plan - <span className={styles.span}>{plan.name}</span></h1>
        {cardsJSX}
    </div>
  )
}

export default Display
