import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Start from "./Start.jsx"
import styles from "../styles/Login.module.css"
import { useForm } from "react-hook-form"
import db from "../services/firebase"
import {collection, query, where, getDocs, QuerySnapshot} from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { useTranslation } from 'react-i18next';



function Login() {

    const{ register, handleSubmit, setError, formState: {errors} } = useForm()
    const usuarios = collection(db, "usuarios")
    const[userdata, setUserData] = useState({})
    const[authenticated, setAuthenticated] = useState(false)
    const[loginButton, setLoginButton] = useState(styles.logButton)
    const auth = getAuth()

    const { t } = useTranslation()

    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            setLoginButton(prevLoginButton => `${prevLoginButton}  ${styles.active}`)
            setTimeout(() =>{setLoginButton(styles.logButton)}, 100)
        }
    }

    const onSubmit = async (data) => {
        try {
            const q = query(collection(db, "usernames"), where("username", "==", data.name));
            const snap = await getDocs(q);
            if (snap.empty) {
                setError("name", { type: "manual", message: t("userError") });
                return;
            }
            const email = snap.docs[0].data().email;
            signInWithEmailAndPassword(auth, email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setAuthenticated(true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError("password", { type: "manual", message: t("passwordError") });
                    console.error(errorCode, errorMessage);
                });
        } catch (error) {
            console.log(error.message);
            setError("password", { type: "manual", message: t("passwordError") });
        }
    }

    const onRegister = (data) => {
        createUserWithEmailAndPassword(auth, data.user, data.password)
        .then((userCredential) => {
            const user = userCredential.user
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
        })
    }
    
  return (
    <>
        {
            authenticated ? (
                <Start userdata={userdata} t={t}/>
            ) : (
                <div className={styles.loginContainer}>
                <div className={styles.cardLogin}>
                    <div className={styles.heading}>
                        {t("visible")} <span className={styles.white}>{t("progress")}.</span> {t("unstoppable")} <span className={styles.white}>{t("motivation")}.</span>
                    </div>
                    <div className={styles.subHeading}>
                        {t("tracking")}
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="images/GYM.webp" alt="" />
                    </div>
                </div>
                <div className={styles.login} id="login">
                    <div className={styles.header}>
                        <div className={styles.iconContainer}>
                            <i className={`${styles.icon} fa-solid fa-dumbbell fa-2xl`} style={{ color: "#ffffff" }}></i>
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
                            <input onKeyDown={onKeyDown} type="text" className={`${styles.formControl} form-control`} id="name" placeholder='Usuario'
                                {...register("name", { required: t("noUser") })}
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.passwordContainer} form-group`}>
                            <input onKeyDown={onKeyDown} type="password" className={`${styles.formControl} form-control`} id="password" placeholder='Contraseña'
                                {...register("password", { required: t("noPassword") })}
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <button className={loginButton}>{t("logIn")}</button>
                    </form>
                    <div className={styles.line}></div>
                    <p className="">{t("noAccount")}</p>
                    <button type='submit' className={styles.registerButton} id="register">{t("register")}</button>
                </div>
            </div>
            
            )
        }
    </>

  )
}

export default Login
