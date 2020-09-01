import React, { useState, useEffect, useContext } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const chartOptions = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Avg Market Salaries',
  },
  legend: {
    labels: {
      filter: function(legendItem, chartData) {
        return legendItem.text !== 'Avg'
      }
    },
    position: 'bottom',
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    datalabels: {
      formatter: function(value, context) {
        return '$' + value + 'k'
      }
    }
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label || ''
        label += ': $' + Math.round(tooltipItem.yLabel)  + 'k'
        return label
      }
    }
  },
  scales: {
    xAxes: [{
       gridLines: {
          display: false,
       },
      //  ticks: {
      //  },
    }],
    yAxes: [{
       gridLines: {
          drawOnChartArea: false,
       },
       ticks: {
         stepSize: 15,
         max: 165.000,
         min: 90.000,
         callback: function(value, index, values) {
          return '$' + value + 'k'
         }
       },
    }]
  },
}

Chart.plugins.unregister(ChartDataLabels)
defaults.global.defaultFontSize = 16
defaults.global.plugins.datalabels.anchor = 'end'
defaults.global.plugins.datalabels.align = 'end'
defaults.global.defaultFontFamily = (
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', \
  'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', \
  'Droid Sans', 'Helvetica Neue', sans-serif"
  )

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
          // console.log(data)
          setData({...data})
        } else throw res

      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem('token')
          setAuth('')
          history.push('/login')
        }
        console.dir(err)
        console.error(err)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chartData = {
    // labels: ['Austin', 'Charlotte', 'New York', 'San Francisco', 'Washington DC'],
    labels: data.javascript?.labels,
    datasets: [
      {
        label: 'JavaScript',
        data: data.javascript?.avg_salaries,
        backgroundColor: 'rgba(247, 223, 30, 0.4)',
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
    ]
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          backgroundColor: '#EEE',
          margin: '50px',
          padding: '25px',
          boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
          width: '80vw',
          maxWidth: '1250px',
          minWidth: '800px',
          height: '60vh',
        }}
      >
        <Bar
          // style={{ justifyContent: 'center' }}
          data={chartData}
          // width={100}
          // height={20}
          options={chartOptions}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  )
}

export default MarketSalary


// const data = {
//   'python': 'hello',
//   'javascript': 'helloo',
// }

// console.log(data.length)
