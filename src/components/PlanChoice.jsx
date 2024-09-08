import React from "react"
import styles from "../styles/PlanChoice.module.css"
function PlanChoice({ animation, navigate }) {
  const onPremade = () => {
    navigate("premade")
  }

  const onCustom = () => {
    navigate("custom")
  }
  return (
    <div className={`${styles.card} ${animation}`}>
      <h1>What are you looking for?</h1>
      <div className={styles.mainContainer}>
        <div
          className={`${styles.choice} ${styles.premade}`}
          onClick={onPremade}
        >
          <h1>Premade Plan</h1>
          <p>
            Choose from one of our science-based, tried and tested workout
            routines. Designed by experts.
          </p>
        </div>
        <div className={`${styles.choice} ${styles.custom}`} onClick={onCustom}>
          <h1>Custom Plan</h1>
          <p>
            Customize your plan to fit your goals. Choose which muscle groups
            you want to hit the most.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlanChoice
