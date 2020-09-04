import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import UserContext from '../context/UserContext'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Container,
  Checkbox,
  Typography,
  Grid,
  Divider,
  Switch,
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    // padding: '5px 0',
    backgroundColor: '#EEE',
    margin: '0 0 20px 0',
  },
  switch: {
    color: theme.palette.primary,
  }
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: '0 10px',
  //   textAlign: 'center',
  //   color: theme.palette.secondary,
  // },
}))


const SearchWidget = ({ filterByOptions }) => {
  const { options, setOptions } = useContext(UserContext)
  const classes = useStyles()


  const handleChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked })
    const checked = event.target.checked
    const name = event.target.name
    filterByOptions(name, checked)
  }

  return (
    <Container disableGutters={true} >
      <Accordion className={classes.root}>
        <AccordionSummary expandIcon={<SettingsRoundedIcon />} >
          {/* <Typography variant='h6'>Search Config</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container
            spacing={2}
            justify='space-around'
          >
            <Grid item container
              xs={6}
              justify='flex-end'
              component={FormControlLabel}
              label='Consulting'
              control={
                <Switch
                  checked={options.consulting}
                  onChange={handleChange}
                  name="consulting"
                ></Switch>
              }
            />
            <Grid item container
              xs={6}
              justify='flex-start'
              component={FormControlLabel}
              label='Heavy Filter'
              control={
                <Switch
                  checked={options.filter}
                  onChange={handleChange}
                  name="filter"
                  color='primary'
                ></Switch>
              }
            />
            <Grid item xs={5}>
              <Typography variant='h6' align='center' gutterBottom={true}>Tech</Typography>
              <Divider />
              <Grid container
                component={FormGroup}
                row={true}
                // justify='space-between'
              >
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  label="JavaScript"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.javascript}
                      onChange={handleChange}
                      name="javascript"
                    />}
                />
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  label="Python"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.python}
                      onChange={handleChange}
                      name="python"
                    />}
                />
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  label="Ruby"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.ruby}
                      onChange={handleChange}
                      name="ruby"
                    />}
                  />
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  label="Java"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.java}
                      onChange={handleChange}
                      name="java"
                    />}
                />
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='h6' align='center' gutterBottom={true}>Market</Typography>
              <Divider />
              <Grid container component={FormGroup} row={true}>
                <Grid item
                  xs={12}
                  md={6}
                  label="Austin, TX"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.austin}
                      onChange={handleChange}
                      name="austin"
                      />}
                />
                <Grid item
                  xs={12}
                  md={6}
                  label="Boston, MA"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.boston}
                      onChange={handleChange}
                      name="boston"
                    />
                  }
                />
                <Grid item
                  xs={12}
                  md={6}
                  label="Charlotte, NC"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.charlotte}
                      onChange={handleChange}
                      name="charlotte"
                    />}
                />
                <Grid item
                  xs={12}
                  md={6}
                  label="New York, NY"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.newYork}
                      onChange={handleChange}
                      name="newYork"
                    />}
                />
                <Grid item
                  xs={12}
                  md={6}
                  label="San Francisco, CA"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                    checked={options.sanFrancisco}
                    onChange={handleChange}
                    name="sanFrancisco"
                    />}
                />
                <Grid item
                  xs={12}
                  md={6}
                  label="Seattle, WA"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.seattle}
                      onChange={handleChange}
                      name="seattle"
                    />
                  }
                />
                <Grid item
                  xs={12}
                  md={6}
                  label="Washington, DC"
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={options.washington}
                      onChange={handleChange}
                      name="washington"
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

export default SearchWidget
