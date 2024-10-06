import React, { useEffect, useState } from "react"
import styles from "../styles/UploadPlan.module.css"
import * as XLSX from "xlsx"

function UploadPlan({ animation }) {
  const [csvData, setCsvData] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result)
        const workbook = XLSX.read(data, { type: "array" })

        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        const csv = XLSX.utils.sheet_to_csv(worksheet)
        console.log(csv)
        setCsvData(csv)
      }
    }
  }

  return (
    <div className={`${styles.card} ${animation}`}>
      UploadPlan
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  )
}

export default UploadPlan
