import React, { useEffect, useState, useRef } from "react"
import styles from "../styles/Register.module.css"
import { useForm } from "react-hook-form"

function Register({ t }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [usernamePlaceholder, setUsernamePlaceholder] = useState("block")
  const [emailPlaceholder, setEmailPlaceholder] = useState("block")
  const [passwordPlacedholder, setPasswordPlaceholder] = useState("block")
  const [gender, setGender] = useState("male")
  const [birthDatePlaceholder, setBirthdayPlaceholder] = useState("block")
  const [visiblePassword, setVisiblePassword] = useState("true")

  const onHover = (e) => {
    e._reactName === "onMouseEnter"
      ? e.currentTarget.classList.add(styles.hover)
      : e.currentTarget.classList.remove(styles.hover)
  }

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword)
  }

  const onSubmit = (data) => {}

  return (
    <div className={styles.registerCard}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <i
            className={`${styles.icon} fa-solid fa-dumbbell fa-2xl`}
            style={{ color: "#ffffff" }}
          ></i>
        </div>
        <div className={styles.brand}>
          <h1>Fierro App</h1>
        </div>
      </div>
      <h1 className={styles.welcome}>{t("newAccount")}</h1>
      <p className={styles.p}>{t("registerSubheading")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`form-group ${styles.formGroup}`}>
          <div className={`form-group ${styles.formGroup}`}>
            <div className={styles.inputContainer}>
              <input
                type="email"
                className={`form-control ${styles.formControl}`}
                id="email"
                placeholder={t("email")}
              />
              <div className={styles.formIcon}>
                <i className="fa-regular fa-envelope"></i> &nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              id="username"
              placeholder={t("username")}
            />
            <div className={styles.formIcon}>
              <i className="fa-regular fa-user"></i> &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
        <div className={`form-group ${styles.formGroup}`}>
          <div className={styles.inputContainer}>
            <input
              type={`${visiblePassword ? "text" : "password"}`}
              className={`form-control ${styles.formControl}`}
              id="password"
              placeholder={t("password")}
            />
            <div
              className={styles.formIcon}
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              <i
                className={`fa-solid fa-eye${!visiblePassword ? "" : "-slash"}`}
              ></i>{" "}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
        <div
          className={`form-group ${styles.formGroup} ${styles.genderContainer}`}
        >
          <div
            className={
              gender === "male"
                ? `${styles.gender} ${styles.selected}`
                : styles.gender
            }
            onClick={() => {
              setGender("male")
            }}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            <div className={styles.iconContainer}>
              <i
                className={`fa-solid fa-mars ${styles.icon}`}
                style={{ color: "#0989FF" }}
              />
            </div>
            <div className={styles.genderText}>{t("male")}</div>
          </div>
          <div
            className={
              gender === "female"
                ? `${styles.gender} ${styles.selected}`
                : styles.gender
            }
            onClick={() => {
              setGender("female")
            }}
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            <div className={styles.iconContainer} style={{ color: "#f0f" }}>
              <i className={`fa-solid fa-venus ${styles.icon}`} />
            </div>
            <div className={styles.genderText}>{t("female")}</div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
