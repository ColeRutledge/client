import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Divider, Grid } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    // minWidth: 375,
    width: 435,
    // minHeight: 400,
    backgroundColor: '#EEE',
    boxShadow: '0 10px 30px 0 rgba(0,0,0,.3), 0 1px 2px 0 rgba(0,0,0,.2)',
  },
  listNums: {
    textAlign: 'right',
  }
})

const MetricCard = ({ metrics: { title, data } }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Divider />
        <List aria-label={title}>
          {data.map((x, i) => (
            <Grid container component={ListItem} key={i} justify='center'>
              <Grid item component={ListItemText} primary={x[0]} secondary={x[2] ? x[2] : null}/>
              <Grid item component={ListItemText} primary={x[1]} className={classes.listNums} />
            </Grid>
          ))}
        </List>
      </CardContent>
      {/* <CardActions><Button size="small">Learn More</Button></CardActions> */}
    </Card>
  )
}

export default MetricCard
