import React, { useContext, useState } from "react"
import styles from "../styles/StatsDisplay.module.css"
import LineGraph from "./LineGraph"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import UserContext from "../contexts/UserContext"

ChartJS.register(ArcElement, Tooltip, Legend)
function StatsDisplay({ animation, setAnimation }) {
  const { user } = useContext(UserContext)

  const [monthlyCompletedSessionsData, setMonthlyCompletedSessionsData] =
    useState(user.plan.monthlyCompletedSessions || [80, 20])
  const data = {
    labels: ["Completed Sessions", "Uncompleted Sessions"], // Labels for the sections
    datasets: [
      {
        label: "Sessions",
        data: [80, 20], // Completed (80), Uncompleted (20)
        backgroundColor: ["#00a859", "#ECEFEA"], // Colors for the donut
        borderColor: ["#00a859", "#ECEFEA"], // Border colors (same as background)
        borderWidth: 2, // Thickness of the borders
      },
    ],
  }

  // Options for the chart
  const options = {
    responsive: true,
    cutout: "90%", // Makes it a donut by increasing the cutout
    plugins: {
      legend: {
        display: false, // Shows the legend
        position: "bottom", // Position of the legend
      },
    },
  }

  return (
    <div className={`${styles.card} ${animation}`}>
      <div className={styles.topContainer}>
        <div className={styles.statCard}>
          <h1>GymPal ELO</h1>
          <h2>
            <span>800</span>
            <i className="fa-solid fa-play fa-sm fa-rotate-270"></i>
            15%
          </h2>
        </div>
        <div className={styles.statCard}>
          <h1>Completed Sessions</h1>{" "}
          <div className={styles.completedSessionsContainer}>
            <div className={styles.donutChartContainer}>
              <Doughnut data={data} options={options}></Doughnut>
              <p>80%</p>
            </div>
            last 30 days
          </div>
        </div>

        <div className={styles.statCard}></div>
      </div>
      <h1 className={styles.h1}>
        Progression: <span>Stage 1</span>
      </h1>
      <div className={styles.lineGraphContainer}>
        <LineGraph></LineGraph>
        <div className={styles.target}>
          <i className="fa-solid fa-circle" style={{ fontSize: "12px" }}></i>
          <p>Target: 1000 ELO</p>
        </div>
      </div>
    </div>
  )
}

export default StatsDisplay
