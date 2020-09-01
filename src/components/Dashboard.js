import React from 'react'
import MarketSalary from './MarketSalary'
import MarketPctByTech from './MarketPctByTech'


const Dashboard = () => {
  return (
    <>
      <MarketPctByTech />
      <MarketSalary />
    </>
  )
}

export default Dashboard
