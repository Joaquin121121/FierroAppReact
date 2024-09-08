import React, { useEffect, useState, useRef, useContext } from "react"
import styles from "../styles/Register.module.css"
import { useForm } from "react-hook-form"
import { db, auth } from "../services/firebase"
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import TranslationContext from "../contexts/TranslationContext"
import UserContext from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { changeLanguage } from "i18next"

function Register({ setAction, username, email, providerLogIn, setDisabled }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState("male")
  const [language, setLanguage] = useState("en")
  const [visiblePassword, setVisiblePassword] = useState("fzlse")
  const [registerCardStyles, setRegisterCardStyles] = useState(
    `${styles.registerCard} ${styles.fadeDown}`
  )

  const { user, setUser } = useContext(UserContext)
  const t = useContext(TranslationContext)

  const navigate = useNavigate()

  const onHover = (e) => {
    e._reactName === "onMouseEnter"
      ? e.currentTarget.classList.add(styles.hover)
      : e.currentTarget.classList.remove(styles.hover)
  }

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      if (providerLogIn) {
        const userdata = {
          email: email,
          username: data.username,
          gender: gender,
          language: language,
          hasPlan: false,
          weeklyCompletedSessions: 0,
          perfectStreak: 0,
        }
        await setDoc(doc(db, "userdata", auth.currentUser.uid), userdata)
        setUser(userdata)
        changeLanguage(language)
        navigate("/start")
      } else {
        const q = query(
          collection(db, "usernames"),
          where("username", "==", data.username)
        )
        const snap = await getDocs(q)
        console.log(snap.empty)
        if (!snap.empty) {
          setError("username", { type: "manual", message: t("usernameInUse") })
          window.scrollTo({ top: 0, behavior: "smooth" })
          return
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )
        await addDoc(collection(db, "usernames"), {
          email: data.email,
          username: data.username,
        })
        const userdata = {
          email: data.email,
          name: data.username,
          gender: gender,
          language: language,
          hasPlan: false,
          weeklyCompletedSessions: 0,
          perfectStreak: 0,
        }
        await setDoc(doc(db, "userdata", userCredential.user.uid), userdata)
        setUser(userdata)
        await signInWithEmailAndPassword(auth, data.email, data.password)
        changeLanguage(language)
        navigate("/start")
      }
    } catch (error) {
      console.log(error.code)
      switch (error.code) {
        case "auth/weak-password":
          setError("password", { type: "manual", message: t("weakPassword") })
          window.scrollTo({ top: 0, behavior: "smooth" })
          break
        case "auth/email-already-in-use":
          setError("email", { type: "manual", message: t("emailInUse") })
          window.scrollTo({ top: 0, behavior: "smooth" })
          break
        default:
          break
      }
    }
    setLoading(false)
  }

  const onClose = () => {
    setTimeout(() => {
      setDisabled(false)
      setAction("login")
    }, 500)
    setRegisterCardStyles(`${styles.registerCard} ${styles.fadeUp}`)
  }

  return (
    <div className={registerCardStyles}>
      <div className={styles.closeButton} onClick={onClose}>
        <i className="fa-solid fa-xmark fa-xl"></i>
      </div>
      {providerLogIn && (
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
      )}
      <p className={styles.p}>{t("registerSubheading")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!providerLogIn && (
          <div className={`form-group ${styles.formGroup}`}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={`form-control ${styles.formControl}`}
                id="email"
                placeholder={t("email")}
                {...register("email", { required: t("noEmail") })}
              />
              {errors.email && (
                <span className={`text-danger ${styles.span}`}>
                  {errors.email.message}
                </span>
              )}
              <div className={styles.formIcon}>
                <i className="fa-regular fa-envelope"></i> &nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
        )}
        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              id="username"
              placeholder={t("username")}
              defaultValue={username || ""}
              {...register("username", { required: t("noUser") })}
            />
            {errors.username && (
              <span className={`text-danger ${styles.span}`}>
                {errors.username.message}
              </span>
            )}
            <div className={styles.formIcon}>
              <i className="fa-regular fa-user"></i> &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>

        {!providerLogIn && (
          <div className={`form-group ${styles.formGroup}`}>
            <div className={styles.inputContainer}>
              <input
                type={`${visiblePassword ? "text" : "password"}`}
                className={`form-control ${styles.formControl}`}
                id="password"
                placeholder={t("password")}
                {...register("password", { required: t("noPassword") })}
              />
              {errors.password && (
                <span className={`text-danger ${styles.span}`}>
                  {errors.password.message}
                </span>
              )}
              <div
                className={styles.formIcon}
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                style={{ cursor: "pointer", right: "12.5%" }}
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-solid fa-eye${
                    !visiblePassword ? "" : "-slash"
                  }`}
                ></i>{" "}
                &nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
        )}
        <div className={styles.section}>
          <h2 className={styles.h2}>{t("gender")}</h2>
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
        </div>
        <div className={styles.section} style={{ marginTop: 0 }}>
          <h2 className={styles.h2}>{t("language")}</h2>
          <div className={styles.languageContainer}>
            <div
              className={
                language === "en"
                  ? `${styles.language} ${styles.selected}`
                  : styles.language
              }
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              onClick={() => {
                setLanguage("en")
              }}
            >
              <img
                src="images/english.webp"
                alt="english"
                className={styles.flag}
              ></img>
              <p className={styles.languageName}>English</p>
            </div>
            <div
              className={
                language === "es"
                  ? `${styles.language} ${styles.selected}`
                  : styles.language
              }
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              onClick={() => {
                setLanguage("es")
              }}
            >
              <img
                src="images/spanish.jpg"
                alt="spanish"
                className={styles.flag}
              ></img>
              <p className={styles.languageName}>Español</p>
            </div>
            <div
              className={
                language === "fr"
                  ? `${styles.language} ${styles.selected}`
                  : styles.language
              }
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              onClick={() => {
                setLanguage("fr")
              }}
            >
              <img
                src="images/french.webp"
                alt="french"
                className={styles.flag}
              ></img>
              <p className={styles.languageName}>Français</p>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">
            {t("newAccount")}
          </button>
          <div
            className={styles.loadingAnimation}
            style={{ display: loading ? "block" : "none" }}
          >
            <img src="images/loading-animation.gif" alt="loading-animation" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
