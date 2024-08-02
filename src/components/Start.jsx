import React, { useContext, useEffect, useState } from "react"
import styles from "../styles/StartLight.module.css"
import Welcome from "./Welcome.jsx"
import New from "./New.jsx"
import Display from "./Display.jsx"
import ExerciseSwap from "./ExerciseSwap.jsx"
import "../styles/Global.css"

function Start({ userdata }) {
  const [page, setPage] = useState("welcome")
  const [prevPage, setPrevPage] = useState("")
  const [mouseDown, setMouseDown] = useState(false)
  const [sessionN, setSessionN] = useState(0)

  const onMouseUp = () => {
    setMouseDown(false)
  }

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 })
  }, [page])

  return (
    <div className={`container ${styles.container}`} onMouseUp={onMouseUp}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.iconContainer}>
            <i
              className={`${styles.icon} fa-solid fa-dumbbell fa-2xl`}
              style={{ color: "#ffffff" }}
            ></i>
          </div>
          <h1>Fierro App</h1>
        </div>
        <div className={styles.user}>
          <i className={`${styles.userIcon} fa-regular fa-user fa-2xl`}></i>
          <div className={styles.text} id="user">
            {userdata ? userdata.name || "Joaquin121" : "Joaquin121"}
          </div>
        </div>
      </div>
      {page === "welcome" && (
        <Welcome
          setPage={setPage}
          prevPage={prevPage}
          setPrevPage={setPrevPage}
        />
      )}
      {page === "new" && (
        <New
          setPage={setPage}
          mouseDown={mouseDown}
          setMouseDown={setMouseDown}
          prevPage={prevPage}
          setPrevPage={setPrevPage}
        />
      )}
      {page === "display" && (
        <Display
          setPage={setPage}
          setSessionN={setSessionN}
          prevPage={prevPage}
          setPrevPage={setPrevPage}
        />
      )}
      {page === "exerciseSwap" && (
        <ExerciseSwap
          n={sessionN}
          setPage={setPage}
          prevPage={prevPage}
          setPrevPage={setPrevPage}
        />
      )}
    </div>
  )
}

export default Start
