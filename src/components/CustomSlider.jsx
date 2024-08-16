import React, { useContext, useEffect, useRef, useState } from "react"
import styles from "../styles/Slider.module.css"
import setSlider from "../services/sliderService.js"
import TranslationContext from "../contexts/TranslationContext.jsx"

function CustomSlider({ field, mouseDown, setMouseDown, counter, setCounter }) {
  const [sliderBarX, setSliderBarX] = useState(0)
  const [sliderBarWidth, setSliderBarWidth] = useState(0)
  const sliderBarRef = useRef(null)
  const sliderRef = useRef(null)

  const t = useContext(TranslationContext)

  const updateSliderDimensions = () => {
    setSliderBarX(sliderBarRef.current.getBoundingClientRect().left)
    setSliderBarWidth(sliderBarRef.current.offsetWidth)
    sliderRef.current.style.width = "33%"
    setCounter(field === "frequency" ? 3 : 40)
  }

  const onMouseDown = (e) => {
    setMouseDown(true)
    const [width, count] = setSlider(
      field,
      sliderBarX,
      sliderBarWidth,
      e.clientX
    )
    sliderRef.current.style.width = `${width + 10}px`
    setCounter(count)
  }

  const onMouseMove = (e) => {
    if (mouseDown) {
      const [width, count] = setSlider(
        field,
        sliderBarX,
        sliderBarWidth,
        e.clientX
      )
      sliderRef.current.style.width = `${width + 10}px`
      setCounter(count)
    }
  }

  useEffect(() => {
    updateSliderDimensions()

    window.addEventListener("resize", updateSliderDimensions)

    return () => {
      window.removeEventListener("resize", updateSliderDimensions)
    }
  }, [setCounter, field])

  useEffect(() => {
    setTimeout(() => {
      updateSliderDimensions()
    }, 500)
  }, [])

  return (
    <div
      className={styles.slider}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
    >
      <div className={styles.sliderBar} ref={sliderBarRef}>
        <div className={styles.progress} ref={sliderRef}>
          <div
            className={styles.pill}
            onDragStart={(e) => {
              e.preventDefault()
            }}
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
      <div className={styles.counter}>{counter}</div>
      <p>
        {field === "frequency" ? t("weeklySessions") : t("minutesPerSession")}
      </p>
    </div>
  )
}

export default CustomSlider
