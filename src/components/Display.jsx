import React, { useEffect, useRef, useState } from 'react'
import styles from "../styles/Display.module.css"
import autoScroll from "../services/displayService.js"

function Display({ plan, t, parentContainerRef }) {

    const[cardsJSX, setCardsJSX] = useState("")

    const cardRef = useRef(null)

    



    useEffect(() => {

        const loadJSX = () => {

            
            
            let img = ""
            let jsx = []

            for(let i = 1; i <= plan.sessions; i++){
                if(plan.sessions > 3){
                    
                    switch (plan[`session ${i}`].name){
                        case "Push Day":
                            img = "images/bench-press.webp"
                            break
                        case "Pull Day":
                            img = "images/pull.jpg"
                            break
                        case "Leg Day":
                            img = "images/legs.jpg"
                            break
                        case "Upper Day":
                            img = "images/full-body-3.jpg"
                            break
                        default:
                            break
                    }
                }
                jsx.push(<div className={styles.sessionContainer} key={i} >
                    <div className={styles.session} style={{animationDelay : `${i + 1}s`}}>
                        <div className={styles.imageContainer}>
                            <img src={img || `images/full-body-${i}.jpg`} alt=""/>
                        </div>
                        <div className={styles.textContainer}>
                            <h1>{t("session")} {i}</h1>
                            <div className={styles.itemContainer}>
                                <div className={styles.iconContainer}>
                                    <i className="fa-regular fa-clock fa-xl" style={{color: "#0989ff"}}></i>
                                </div>
                                {plan.duration} {t("minutes")}
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.iconContainer}>
                                    <i className="fa-solid fa-clipboard-question fa-xl" style={{color: "#0989ff"}}></i>
                                </div>
                                {plan[`session ${i}`].name || "Full Body"}
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.iconContainer}>
                                    <i className="fa-regular fa-clock fa-xl" id="clock-icon" style={{color: "#0989ff"}}></i>
                                </div>
                                {plan[`session ${i}`].nExercises} {t("exercises")}
                            </div>
                        </div>
                    </div>
                    <div className={styles.editContainer}>
                        <div className={styles.edit}>
                            <i className="fa-solid fa-pen fa-xl" style={{color: "white"}}></i>
                        </div>
                        {t("editSession")} {i}  
                    </div>
                </div>)

            }

            jsx.push(<div className={styles.buttonsContainer} style={{animationDelay : `${plan.sessions + 1 }s`}}>
                <button className={styles.returnButton}>
                    {t("back")}
                </button>
                <button className={styles.startButton}>
                    {t("start")}
                </button>
            </div>)
            return jsx
        }


     

        setCardsJSX(loadJSX())
        console.log(parentContainerRef.current.offsetHeight + window.innerHeight)
        setTimeout(() => {autoScroll(parentContainerRef.current.offsetHeight - window.innerHeight)}, 2000)
        
    }, [plan])

  return (
    <div className={styles.card} ref={cardRef}>
        <h1>{t("myPlan")}<span className={styles.span}>{plan.name}</span></h1>
        {cardsJSX}
        
    </div>
  )
}

export default Display
