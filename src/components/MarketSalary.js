import React from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const chartData = {
  labels: ['Austin', 'Charlotte', 'New York', 'San Francisco', 'Washington DC'],
  datasets: [
    {
      label: 'JavaScript',
      data: [110.4, 116.4, 116.5, 141.9, 115.2],
      backgroundColor: 'rgba(247, 223, 30, 0.4)',
      borderColor: 'rgba(247, 223, 30, 1)',
      borderWidth: 2,
    },
    {
      label: 'Python',
      data: [154.3, 131.4, 162.1, 160.7, 120.3],
      backgroundColor: 'rgba(55, 118, 171, 0.2)',
      borderColor: 'rgba(55, 118, 171, 1)',
      borderWidth: 2,
    },
  ]
}

const chartOptions = {
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Avg Market Salaries',
    // fontSize: 30,
    // padding: 50,
  },
  legend: {
    labels: {
      // fontSize: 20,
      // padding: 30,
      filter: function(legendItem, chartData) {
        return legendItem.text !== 'Avg'
      }
    },
    position: 'bottom',
    borderWidth: 0,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    datalabels: {
      // color: '#36A2EB',
      // fontSize: '10px',
      formatter: function(value, context) {
        return '$' + value + 'k'
      }
    }
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        let label = data.datasets[tooltipItem.datasetIndex].label || ''
        label += ': $' + Math.round(tooltipItem.yLabel) + 'k'
        return label
      }
    }
  },
  scales: {
    xAxes: [{
       gridLines: {
          display: false,
          // drawOnChartArea: false,
       },
       ticks: {
        // fontSize: 20,
       },
    }],
    yAxes: [{
       gridLines: {
          // display: false,
          drawOnChartArea: false,
       },
       ticks: {
         stepSize: 15,
         max: 165.000,
         min: 90.000,
        //  fontSize:20,
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
  return (
    <div
      style={{
        backgroundColor: '#EEE',
        margin: '50px',
        padding: '25px',
        boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
        // height: '500px',
        maxWidth: '100vw',
        height: '60vh',
        // width: '600px',
      }}
    >
      <Bar
        data={chartData}
        // width={100}
        // height={20}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}

export default MarketSalary
