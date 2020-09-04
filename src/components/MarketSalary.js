import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Bar, defaults } from 'react-chartjs-2'
// import Chart from 'chart.js'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

// Chart.plugins.unregister(ChartDataLabels)
defaults.global.defaultFontSize = 15


const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  title: { display: true, text: 'Avg Market Salaries' },
  layout: { padding: 50 },
  legend: {
    position: 'bottom',
    // labels: { filter: (legendItem, chartData) => legendItem.text !== 'Avg' },
  },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
      font: { size: 12 },
      formatter: (value, context) => '$' + Math.round(value) + 'k'
    },
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label || ''
        label += ': $' + tooltipItem.yLabel  + 'k'
        return label
  }}},
  scales: { xAxes: [{ gridLines: { display: false } }],
    yAxes: [{
      gridLines: { drawOnChartArea: false },
      ticks: {
        stepSize: 15, max: 195.000, min: 90.000,
        callback: (value, index, values) => '$' + value + 'k' },
  }]}}


const MarketSalary = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ data, setData ] = useState({})
  const history = useHistory()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/avgmktsalaries`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          setData({...data})
        } else throw res

      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem('token')
          setAuth('')
          history.push('/login')
        }
        // console.dir(err)
        console.error(err)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chartData = {
    labels: data.javascript?.labels,
    datasets: [
      {
        label: 'JavaScript',
        data: data.javascript?.avg_salaries,
        backgroundColor: 'rgba(247, 223, 30, 0.2)',
        borderColor: 'rgba(247, 223, 30, 1)',
        borderWidth: 2,
      },
      {
        label: 'Python',
        data: data.python?.avg_salaries,
        backgroundColor: 'rgba(55, 118, 171, 0.2)',
        borderColor: 'rgba(55, 118, 171, 1)',
        borderWidth: 2,
      },
      {
        label: 'Java',
        data: data.java?.avg_salaries,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
      {
        label: 'Ruby',
        data: data.ruby?.avg_salaries,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ]
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
      <div
        style={{
          backgroundColor: '#EEE',
          margin: '50px 0',
          boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
          height: '60vh',
          width: '1500px',
        }}
      >
        <Bar
          data={chartData}
          options={chartOptions}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  )
}

export default MarketSalary
