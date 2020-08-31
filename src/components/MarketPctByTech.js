import React from 'react'
import { Doughnut, Pie, defaults } from 'react-chartjs-2'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// search_terms          search_loc
// javascript developer  New York, NY         22.72
//                       Washington, DC       22.72
//                       Austin, TX           21.72
//                       San Francisco, CA    21.22
//                       Charlotte, NC        11.61
// python developer      Washington, DC       24.87
//                       New York, NY         24.36
//                       San Francisco, CA    23.76
//                       Austin, TX           20.78
//                       Charlotte, NC         6.22

const jsChartData = {
  labels: ['Austin', 'Charlotte', 'New York', 'San Francisco', 'Washington DC'],
  datasets: [
    {
      label: 'JavaScript',
      data: [22, 12, 22, 21, 23],
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
  labels: ['Austin', 'Charlotte', 'New York', 'San Francisco', 'Washington DC'],
  datasets: [
    {
      label: 'Python',
      data: [21, 6, 24, 24, 25],
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

const chartOptions = {
  cutoutPercentage: 80,
  maintainAspectRatio: false,
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
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#EEE',
          maxWidth: '100vw',
          height: '60vh',
          // width: '100%',
          margin: '50px',
          padding: '25px',
          boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)'
        }}
      >
        <div>
          <Doughnut
            data={jsChartData}
            // width={750}
            // height={10}
            options={chartOptions}
            plugins={[ChartDataLabels]}
            />
        </div>
        <div>
          <Doughnut
            data={pyChartData}
            // width={750}
            // height={10}
            options={{...chartOptions, title: { display: true, text: 'Python Market Share by Location' }}}
            plugins={[ChartDataLabels]}
          />
        </div>
      </div>
    </>
  )
}

export default MarketPctByTech
