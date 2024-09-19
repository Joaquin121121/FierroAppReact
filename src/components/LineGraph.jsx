import React, { useRef, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const LineGraph = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chart = chartRef.current

    if (chart) {
      const ctx = chart.ctx
      const gradient = ctx.createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, "#D6EFFF")
      gradient.addColorStop(1, "#0989FF")

      chart.data.datasets[0].backgroundColor = gradient
      chart.update()
    }
  }, [])

  const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: "ELO",
        data: [
          840, 850, 855, 860, 865, 870, 875, 880, 885, 890, 870, 880, 885, 895,
          900,
        ],
        borderColor: "#0989FF",
        borderWidth: 2,
        fill: true,
        pointRadius: 0,
        pointBackgroundColor: "#0909FF",
        spanGaps: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 3,
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "ELO",
        },
        min: 800,
        max: 1000,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          family: "Inter",
        },
        bodyFont: {
          family: "Inter",
        },
      },
    },
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default LineGraph
