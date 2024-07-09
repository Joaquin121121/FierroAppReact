import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Start from "./Start.jsx"
import styles from "../styles/Login.module.css"
import { useForm } from "react-hook-form"
import db from "../services/firebase"
import {collection, query, where, getDocs} from "firebase/firestore"
import { useTranslation } from 'react-i18next';



function Login() {

    const{ register, handleSubmit, setError, formState: {errors} } = useForm()
    const usuarios = collection(db, "usuarios")
    const[userdata, setUserData] = useState({})
    const[autenticated, setAutenticated] = useState(false)
    const[loginButton, setLoginButton] = useState(styles.logButton)

    const { t } = useTranslation()

    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            setLoginButton(prevLoginButton => `${prevLoginButton}  ${styles.active}`)
            setTimeout(() =>{setLoginButton(styles.logButton)}, 100)
        }
    }

    const onSubmit = async(data) =>{
        const q = query(usuarios, where("name", "==", data.name))
        const snap = await getDocs(q)
        console.log(snap)
        if(!snap.empty){
            const doc = snap.docs[0]
            const password = doc.data().password
            if(password === data.password){
                setUserData({
                    ...doc.data(),
                    id : doc.id
                })
                setAutenticated(true)
            }else{
                setError("password", {type : "manual", message : t("passwordError")})
            }
        }else{
            setError("name", {type : "manual", message : t("userError")})
        }

    }
    
  return (
    <>
        {
            autenticated ? (
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
