import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Doughnut, defaults } from 'react-chartjs-2'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const chartOptions = {
  cutoutPercentage: 80,
  maintainAspectRatio: false,
  layout: {
    padding: 50,
  },
  title: {
    display: true,
    text: 'JavaScript Market Share by Location',
  },
  legend: {
    labels: {
      padding: 30,
      fontSize: 15,
    },
    position: 'bottom',
  },
  plugins: {
    datalabels: {
      formatter: function(value, context) {
        return value + '%'
      }
    }
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        return data.labels[tooltipItem.index]
      }
    }
  },
}

Chart.plugins.unregister(ChartDataLabels)
// defaults.global.defaultFontSize = 16
defaults.global.defaultFontFamily = (
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', \
  'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', \
  'Droid Sans', 'Helvetica Neue', sans-serif"
  )

const MarketPctByTech = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ data, setData ] = useState({})
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/mktmetrics`, {
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

  const jsChartData = {
    labels: data.javascript?.labels,
    datasets: [
      {
        label: 'JavaScript',
        data: data.javascript?.mkt_pct,
        backgroundColor: [
          'rgba(247, 223, 30, 0.4)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: 'rgba(247, 223, 30, 1)',
        borderWidth: 1,
      },
    ]
  }

  const pyChartData = {
    labels: data.python?.labels,
    datasets: [
      {
        label: 'Python',
        data: data.python?.mkt_pct,
        backgroundColor: [
          'rgba(247, 223, 30, 0.4)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: 'rgba(55, 118, 171, 1)',
        borderWidth: 1,
      },
    ]
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#EEE',
          width: '80vw',
          height: '60vh',
          minWidth: '800px',
          maxWidth: '1500px',
          margin: '50px',
          boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)'
        }}
      >
        <div>
          <Doughnut
            data={jsChartData}
            options={chartOptions}
            plugins={[ChartDataLabels]}
            />
        </div>
        <div>
          <Doughnut
            data={pyChartData}
            options={{ ...chartOptions, title: { display: true, text: 'Python Market Share by Location' }}}
            plugins={[ChartDataLabels]}
          />
        </div>
      </div>
    </div>
  )
}

export default MarketPctByTech
