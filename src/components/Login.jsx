import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Start from "./Start.jsx"
import styles from "../styles/Login.module.css"
import { useForm } from "react-hook-form"
import db from "../services/firebase"
import {collection, query, where, getDocs} from "firebase/firestore"



function Login() {

    const{ register, handleSubmit, setError, formState: {errors} } = useForm()
    const usuarios = collection(db, "usuarios")
    const[userdata, setUserData] = useState({})
    const[autenticated, setAutenticated] = useState(false)
    const[loginButton, setLoginButton] = useState(styles.logButton)

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
                setError("password", {type : "manual", message : "Contraseña incorrecta"})
            }
        }else{
            setError("name", {type : "manual", message : "El usuario no existe"})
        }

    }
    
  return (
    <>
        {
            autenticated ? (
                <Start userdata={userdata}/>
            ) : (
                <div className={styles.loginContainer}>
                <div className={styles.cardLogin}>
                    <div className={styles.heading}>
                        Progreso <span className={styles.white}>visible.</span> Motivación <span className={styles.white}>imparable.</span>
                    </div>
                    <div className={styles.subHeading}>
                        Seguimiento personalizado y motivación constante para ayudarte a perseverar y alcanzar tus metas.
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
                        <h1>Bienvenido</h1>
                        <p className={styles.subHeading}>Por favor ingrese a su cuenta, o regístrese.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={`${styles.formGroup} form-group`}>
                            <input onKeyDown={onKeyDown} type="text" className={`${styles.formControl} form-control`} id="name" placeholder='Usuario'
                                {...register("name", { required: "Ingrese su nombre de usuario" })}
                            />
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.passwordContainer} form-group`}>
                            <input onKeyDown={onKeyDown} type="password" className={`${styles.formControl} form-control`} id="password" placeholder='Contraseña'
                                {...register("password", { required: "Ingrese su contraseña" })}
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <button className={loginButton}>Iniciar Sesión</button>
                    </form>
                    <div className={styles.line}></div>
                    <p className="">No tiene cuenta?</p>
                    <button type='submit' className={styles.registerButton} id="register">Registrarse</button>
                </div>
            </div>
            
            )
        }
    </>

  )
}

export default Login
