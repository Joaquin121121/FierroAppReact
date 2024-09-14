import React, { useEffect, useState, useCallback, useContext } from "react"
import styles from "../styles/Calendar.module.css"

export default function () {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const abbreviatedDaysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]

  const getFirstDayName = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() // Months are 0-indexed, so no need to add 1 here

    // Create a Date object for the first day of the current month
    const firstDay = new Date(year, month, 1)

    // Get the day name using toLocaleDateString()
    const dayName = firstDay.toLocaleDateString("en-US", { weekday: "long" })

    return dayName
  }

  const getDaysInCurrentMonth = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1 // Months are 0-indexed, so add 1

    // Create a date for the first day of the next month
    const firstDayNextMonth = new Date(year, month, 1)

    // Subtract one day from the first day of the next month to get the last day of this month
    const lastDayCurrentMonth = new Date(firstDayNextMonth - 1)

    // Return the date (which is the number of days in the current month)
    return lastDayCurrentMonth.getDate()
  }

  const [firstDayName, setFirstDayName] = useState(getFirstDayName())
  const [nDays, setNDays] = useState(getDaysInCurrentMonth())
  const [nRows, setNRows] = useState(
    Math.ceil((nDays + daysOfWeek.indexOf(firstDayName)) / 7)
  )
  const [calendar, setCalendar] = useState(
    Array.from({ length: nRows }, (_, i) =>
      daysOfWeek.map((_, j) =>
        i === 0
          ? j >= daysOfWeek.indexOf(firstDayName)
            ? j - daysOfWeek.indexOf(firstDayName) + 1
            : null
          : i === nRows - 1
          ? 7 * i + j <= nDays
            ? 7 * i + j + 1
            : null
          : 7 * i + j + 1
      )
    )
  )

  useEffect(() => {
    console.log(calendar)
  }, [])

  return (
    <>
      <div className={styles.linesContainer}>
        {daysOfWeek.map((e) => (
          <div></div>
        ))}
      </div>
      <div className={styles.calendarTop}></div>
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          <h1 className={styles.month}>
            {new Date().toLocaleString("default", { month: "long" })}
          </h1>
          <div className={styles.dayNames}>
            {abbreviatedDaysOfWeek.map((e) => (
              <p className={styles.p}>{e}</p>
            ))}
          </div>
          <div className={styles.daysContainer}>
            {calendar.map((week) => (
              <div className={styles.week}>
                {week.map(
                  (day) =>
                    (
                      <div className={styles.day} index={day}>
                        <p className={styles.p}>{day}</p>
                      </div>
                    ) || ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
