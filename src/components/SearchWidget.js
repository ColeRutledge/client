import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
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

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#EEE',
    margin: '0 0 20px 0',
  },
  switch: {
    color: theme.palette.primary,
  }
}))


const SearchWidget = ({ filterByOptions }) => {
  const { options, setOptions, auth, setAuth, setPostings, setFeed, } = useContext(UserContext)
  const [ defOptions ] = useState({ ...options })
  const filterOptions = ['senior_filter', 'consulting_filter', 'no_filter']
  const classes = useStyles()
  const history = useHistory()


  const handleChange = async (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked })
    const checked = event.target.checked
    const name = event.target.name
    // console.log(checked, name)
    filterOptions.includes(name) ? await fetchFilters(name, checked) : filterByOptions(name, checked)
  }

  const fetchFilters = async (filterName, checked) => {
    let filt_opt = options
    filt_opt[filterName] = checked

    if (filterName === 'no_filter') {
      if (checked) {
        filt_opt = {
          ...defOptions,
          'no_filter': checked,
          'senior_filter': false,
          'consulting_filter': false,
        }
      } else {
        filt_opt = {
          ...defOptions,
          'no_filter': checked,
          'senior_filter': true,
          'consulting_filter': true,
        }
      }
    } else {
      const consulting_filter = filt_opt['consulting_filter']
      const senior_filter = filt_opt['senior_filter']
      filt_opt = {
        ...defOptions,
        consulting_filter,
        senior_filter,
      }
    }
    setOptions({...filt_opt})

    try {
      const res = await fetch(`${apiUrl}/api/posting`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filt_opt),
      })

      if (res.ok) {
        const data = await res.json()
        setFeed([...data])
        setPostings([...data])
      } else throw res

    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('token')
        setAuth('')
        history.push('/login')
      }
      console.error(err)
    }
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
              xs={4}
              justify='flex-end'
              component={FormControlLabel}
              label='Filter Consulting'
              control={
                <Switch
                  checked={options.consulting_filter}
                  onChange={handleChange}
                  name="consulting_filter"
                ></Switch>
              }
            />
            <Grid item container
              xs={4}
              justify='center'
              component={FormControlLabel}
              label='Filter Senior'
              control={
                <Switch
                  checked={options.senior_filter}
                  onChange={handleChange}
                  name="senior_filter"
                ></Switch>
              }
            />
            <Grid item container
              xs={4}
              justify='flex-start'
              component={FormControlLabel}
              label='No Filter'
              control={
                <Switch
                  checked={options.no_filter}
                  onChange={handleChange}
                  name="no_filter"
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
