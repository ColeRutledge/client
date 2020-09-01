import React, { useState, useEffect, useContext } from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useHistory } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const chartOptions = {
  // onResize: (instance, size) => { console.log(instance, size) },
  cutoutPercentage: 80,
  maintainAspectRatio: false,
  responsive: true,
  layout: { padding: 50 },
  title: { display: true, text: 'JavaScript Market Share by Location' },
  legend: { labels: { padding: 20, fontSize: 13 }, position: 'bottom' },
  plugins: { datalabels: { formatter: (value, context) => value + '%' }},
  tooltips: { callbacks: { label: (tooltipItem, data) => data.labels[tooltipItem.index] }},
}


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

  // useEffect(() => {
  //   function handleResize() {
  //     // chartRef.forceUpdate()
  //     chartRef.current.chartInstance.resize()
  //     // console.dir(chartRef.current.chartInstance)
  //     // console.dir(chartRef.current)
  //     // chartRef.current.update()
  //     // console.dir(chartRef)
  //     console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
  //   }

  //   window.addEventListener('resize', handleResize)
  // })


  const jsChartData = {
    labels: data.javascript?.labels,
    datasets: [
      {
        label: 'JavaScript',
        data: data.javascript?.mkt_pct,
        backgroundColor: data.javascript?.background_color,
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
        backgroundColor: data.python?.background_color,
        borderColor: 'rgba(55, 118, 171, 1)',
        borderWidth: 1,
      },
    ]
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
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
          boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative' }}>
          <Doughnut
            data={jsChartData}
            options={chartOptions}
            plugins={[ChartDataLabels]}
            />
        </div>
        <div style={{ position: 'relative' }}>
          <Doughnut
            data={pyChartData}
            options={{
              ...chartOptions,
              title: { display: true, text: 'Python Market Share by Location' },
            }}
            plugins={[ChartDataLabels]}
          />
        </div>
      </div>
    </div>
  )
}

export default MarketPctByTech
