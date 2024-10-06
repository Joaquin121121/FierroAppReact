import React from "react"

function MainContent() {
  const [migueltrolaso, setMiguelTrolaso] = useState(true)

  return (
    <div>
      {migueltrolaso}

      <button
        onClick={() => {
          setMiguelTrolaso(false)
        }}
      >
        Clickeamo
      </button>
    </div>
  )
}

export default MainContent
