import React, { useEffect, useState, useRef } from 'react'
import styles from "../styles/New.css"



function New() {

    const[mousseX, setMouseX] = useState(0)
    const[progressWidth, setProgressWidth] = useState(0)
    const[progressX, setProgressX] = useState(0)
    const[mouseDown, setMouseDown] = useState(false)
    

    const progressRef = useRef(null)

    const onMouseDown = () => {
        setMouseDown(true)
    }

    const onMouseUp = () =>{
        setMouseDown(false)
    }


    const onMouseMove = (e) => {
        if(mouseDown){
            
        }
    }


    useEffect(()=>{
        const { left } = progressRef.current.getBoundingClientRect()
        setProgressX(left)



    }, [])

  return (
    <div className="card">
        <div className="create">
            <h1>Cuéntanos sobre tu plan</h1>
        </div>    
        <div className="containerFrequency">
            <h1>Frecuencia</h1>
            <div className="sliders">
                <div className="slider">
                    <div className="sliderBar" >
                        <div className="progress" ref={progressRef}>
                            <div className="pill">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                    </div>
                    <div className="counter">3</div> 
                    <p>sesiones x semana</p>
                </div>
                <div className="slider">
                    <div className="sliderBar" id="sliderDuracion">
                        <div className="progress" id="progressDuracion">
                            <div className="pill" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} id="pillDuracion">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                            </div>
                        </div>
                    </div>
                    <div className="counter" id="counterDuracion">60</div> 
                    <p>minutos x sesión</p>
                </div>
            </div>
        </div>
        <div className="containerGoal">
            <h1>Objetivo</h1>
            <div className="goal" id="fuerza">
                <div className="containerImage">
                    <img src="images/STRONGMAN.png" alt="" />
                </div>
                <div className="containerText">
                    Fuerza
                </div>
            </div>
            <div className="goal" id="hipertrofia">
                <div className="containerImage">
                    <img src="images/CBUM.jpg" alt="" />
                </div>
                <div className="containerText">
                    Hipertrofia
                </div>
            </div>
            <div className="goal" id="funcional">
                <div className="containerImage">
                    <img src="images/GOGGINS.png" alt="" />
                </div>
                <div className="containerText">
                    Funcional
                </div>
            </div>
        </div>
        <div className="buttons">
            <button className="buttonBack" id="volver">
                Volver
            </button>
            <button className="buttonStart" id="comenzar">
                Comenzar
            </button>
        </div>
    </div>

  )
}

export default New
