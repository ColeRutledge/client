import React from 'react'
import MarketSalary from './MarketSalary'
import MarketPctByTech from './MarketPctByTech'
import { Container, Grid } from '@material-ui/core'
import Footer from './Footer'
import MetricCard from './MetricCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    maxWidth: 1500,
    marginBottom: 50,
  },
})

const Dashboard = () => {
  const classes = useStyles()

  const metrics = {
    pcount_by_tech: {
      title: 'Position Counts by Tech',
      data: [
        ['JavaScript', '3,599'],
        ['Python', '2,766'],
        ['Java', '2,316'],
        ['Ruby', '278'],
      ],
    },
    pcount_by_loc: {
      title: 'Position Counts by Location',
      data: [
        ['Washington, DC', '2,076'],
        ['San Francisco, CA', '1,534'],
        ['New York, NY', '1,530'],
        ['Seattle, WA', '1,289'],
        ['Boston, MA', '1,274'],
        ['Austin, TX', '868'],
        ['Charlotte, NC', '388'],
      ],
    },
    top_salaries: {
      title: 'Top Paying Jobs',
      data: [
        ['Principal Software Development Engineer', '$350,000', 'Oracle Corp'],
        ['Senior Software Engineer - Backend', '$279,221', 'Pipe17'],
        ['Senior Software Development Engineer', '$250,000', 'Amazon.com'],
        ['Azure Software Engineer', '$240,000', 'Zachary Piper Solutions'],
        ['Front-End/Back-End Web Developer', '$239,500', 'SAIC'],
      ],
    }
  }

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Container disableGutters={true} className={classes.container} >
        <Grid container justify={'space-between'}  >
          <Grid item xs={12} component={MetricCard} metrics={metrics.pcount_by_loc} />
          <Grid item xs={12} component={MetricCard} metrics={metrics.pcount_by_tech} />
          <Grid item xs={12} component={MetricCard} metrics={metrics.top_salaries}/>
        </Grid>
      </Container>
      <MarketPctByTech />
      <MarketSalary />
      <Footer />
    </Container>
  )
}

export default Dashboard
