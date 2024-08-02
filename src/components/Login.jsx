import React, { useContext, useEffect, useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Start from "./Start.jsx"
import Register from "./Register.jsx"
import Main from "./Main.jsx"
import styles from "../styles/Login.module.css"
import { useForm } from "react-hook-form"
import { db, auth } from "../services/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth"
import UserContext from "../contexts/UserContext.jsx"
import TranslationContext from "../contexts/TranslationContext.jsx"
import { changeLanguage } from "i18next"
import { useNavigate } from "react-router-dom"

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [loginButton, setLoginButton] = useState(styles.logButton)
  const [registerButton, setRegisterButton] = useState(styles.registerButton)
  const [action, setAction] = useState("login")
  const loginContainerRef = useRef(null)
  const [disabled, setDisabled] = useState(false)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [providerLogIn, setProviderLogIn] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const t = useContext(TranslationContext)

  const navigate = useNavigate()

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setLoginButton(
        (prevLoginButton) => `${prevLoginButton}  ${styles.active}`
      )
      setTimeout(() => {
        setLoginButton(styles.logButton)
      }, 100)
    }
  }

  const onMouseDown = (field) => {
    if (field === "logIn") {
      if (!disabled)
        setLoginButton(
          (prevLoginButton) => `${prevLoginButton}  ${styles.active}`
        )
    } else {
      if (!disabled)
        setRegisterButton(
          (prevRegisterButton) => `${prevRegisterButton}  ${styles.active}`
        )
    }
  }

  const onMouseUp = (field) => {
    if (field === "logIn") {
      setLoginButton(styles.logButton)
    } else {
      setRegisterButton(styles.registerButton)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const usernameQuery = query(
        collection(db, "usernames"),
        where("username", "==", data.name)
      )
      const usernameSnap = await getDocs(usernameQuery)
      if (usernameSnap.empty) {
        setError("name", { type: "manual", message: t("userError") })
        setLoading(false)
        return
      }
      const email = usernameSnap.docs[0].data().email
      await signInWithEmailAndPassword(auth, email, data.password)
        .then(async (userCredential) => {
          const docRef = doc(db, "userdata", userCredential.user.uid)
          const docSnap = await getDoc(docRef)
          const userdata = docSnap.data()
          setUser(userdata)
          console.log(userdata)
          setLoading(false)
          navigate(userdata.hasPlan ? "/main" : "/start")
        })
        .catch((error) => {
          setLoading(false)
          const errorCode = error.code
          const errorMessage = error.message
          setError("password", { type: "manual", message: t("passwordError") })
          console.error(errorCode, errorMessage)
        })
    } catch (error) {
      setLoading(false)
      console.log(error.message)
      setError("password", { type: "manual", message: t("passwordError") })
    }
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      window.scrollTo({ behavior: "smooth", top: 0 })
      const docRef = doc(db, "userdata", result.user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUser(docSnap.data())
        navigate(docSnap.data().hasPlan ? "/main" : "/start")
      } else {
        const userdata = result.user
        console.log(userdata)
        setUsername(userdata.displayName)
        setEmail(userdata.email)
        setProviderLogIn(true)
        setAction("register")
      }
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
    } catch {}
  }

  const onRegister = () => {
    loginContainerRef.current.classList.add(styles.blur)
    window.scrollTo({ behavior: "smooth", top: 0 })
    setUsername(null)
    setProviderLogIn(false)
    setTimeout(() => {
      setAction("register")
    }, 200)
  }

  const onHover = (e) => {
    if (e._reactName === "onMouseEnter" && !disabled) {
      e.currentTarget.classList.add(
        e.tagName === "DIV" ? styles.hover : styles.btnHover
      )
    } else {
      e.currentTarget.classList.remove(
        e.tagName === "DIV" ? styles.hover : styles.btnHover
      )
    }
  }

  useEffect(() => {
    setDisabled(action === "register")
    if (loginContainerRef.current && action === "login") {
      loginContainerRef.current.classList.remove(styles.blur)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [action])

  return (
    <>
      {action === "register" ? (
        <Register
          setAction={setAction}
          username={username}
          email={email}
          providerLogIn={providerLogIn}
        ></Register>
      ) : null}
      <div
        className={styles.loginContainer}
        ref={loginContainerRef}
        onMouseEnter={onHover}
        onMouseLeave={onHover}
      >
        <div className={styles.languageContainer}>
          <div className={styles.language} onClick={() => changeLanguage("en")}>
            <img src="images/english.webp" alt="" />
          </div>
          <div className={styles.language} onClick={() => changeLanguage("es")}>
            <img src="images/spanish.jpg" alt="" />
          </div>
          <div className={styles.language} onClick={() => changeLanguage("fr")}>
            <img src="images/french.webp" alt="" />
          </div>
        </div>
        <div className={styles.loginCard}>
          <div className={styles.heading}>
            {t("visible")}{" "}
            <span className={styles.white}>{t("progress")}.</span>{" "}
            {t("unstoppable")}{" "}
            <span className={styles.white}>{t("motivation")}.</span>
          </div>
          <div className={styles.subHeading}>{t("tracking")}</div>
          <div className={styles.imageContainer}>
            <img src="images/GYM.webp" alt="" />
          </div>
        </div>
        <div className={styles.login} id="login">
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
          <div className={styles.subHeader}>
            <h1>{t("welcome")}</h1>
            <p className={styles.subHeading}>{t("logInText")}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.formGroup} form-group`}>
              <input
                disabled={disabled}
                onKeyDown={onKeyDown}
                type="text"
                className={`${styles.formControl} form-control`}
                id="name"
                placeholder={t("username")}
                {...register("name", { required: t("noUser") })}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div
              className={`${styles.formGroup} ${styles.passwordContainer} form-group`}
            >
              <input
                disabled={disabled}
                onKeyDown={onKeyDown}
                type="password"
                className={`${styles.formControl} form-control`}
                id="password"
                placeholder={t("password")}
                {...register("password", { required: t("noPassword") })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <button
              className={loginButton}
              disabled={disabled}
              onMouseEnter={onHover}
              onMouseLeave={(e) => {
                onHover(e)
                onMouseUp("logIn")
              }}
              onMouseDown={() => {
                onMouseDown("logIn")
              }}
              onMouseUp={() => {
                onMouseUp("logIn")
              }}
            >
              {t("logIn")}
            </button>
          </form>
          <div className={styles.noAccountDiv} style={{ marginTop: "40px" }}>
            <div className={styles.line}></div>
            <p className={styles.p}>{t("orSignIn")}</p>
            <div className={styles.line}></div>
          </div>
          <div className={styles.signInOptionContainer}>
            <button
              className={styles.signInOption}
              disabled={disabled}
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              onClick={googleSignIn}
            >
              <img
                className={styles.signInOptionIcon}
                src="images/google-icon.webp"
                alt=""
              />
              Google
            </button>
            <div
              className={styles.loadingAnimation}
              style={{ display: loading ? "block" : "none" }}
            >
              <img src="images/loading-animation.gif" alt="loading-animation" />
            </div>
            <button
              className={styles.signInOption}
              disabled={disabled}
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              onClick={facebookSignIn}
              style={{ padding: "0 6%" }}
            >
              <i
                className={`fa-brands fa-facebook-f fa-2xl ${styles.signInOptionIcon}`}
                style={{ color: "#0989FF", height: 0 }}
              ></i>
              Facebook
            </button>
          </div>
          <div className={styles.noAccountDiv} style={{ marginBottom: "20px" }}>
            <div className={styles.line}></div>
            <p className={styles.p}>{t("noAccount")}</p>
            <div className={styles.line}></div>
          </div>
          <button
            className={registerButton}
            onMouseEnter={onHover}
            onMouseLeave={(e) => {
              onHover(e)
              onMouseUp("register")
            }}
            onMouseDown={(e) => {
              onMouseDown("register")
            }}
            onClick={onRegister}
            onMouseUp={() => {
              onMouseUp("register")
            }}
            disabled={disabled}
          >
            {t("newAccount")}
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
