import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
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
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: '5px 0',
    backgroundColor: '#EEE',
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: '0 10px',
  //   textAlign: 'center',
  //   color: theme.palette.secondary,
  // },
}))


const SearchWidget = () => {
  const [ checkboxes, setCheckboxes ] = useState({
    javascript: true,
    python: true,
    ruby: true,
    java: true,
    austin: true,
    charlotte: true,
    newYork: true,
    sanFrancisco: true,
    washington: true,
  })
  const classes = useStyles()

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked })
  }

  return (
    <Container >
      <Accordion className={classes.root}>
        <AccordionSummary expandIcon={<SettingsRoundedIcon />} >
          {/* <Typography variant='h6'>Search Config</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={2}
            justify='space-around'
          >
            <Grid item xs={6}>
              <Typography variant='h6' align='center' gutterBottom={true}>Tech</Typography>
              <Divider />
              <Grid
                container
                component={FormGroup}
                row={true}
              >
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.javascript}
                      onChange={handleChange}
                      name="javascript"
                    />}
                  label="JavaScript"
                />
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.python}
                      onChange={handleChange}
                      name="python"
                    />}
                  label="Python"
                />
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.ruby}
                      onChange={handleChange}
                      name="ruby"
                    />}
                  label="Ruby"
                  />
                <Grid item
                  xs={12}
                  md={6}
                  // justify='space-around'
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.java}
                      onChange={handleChange}
                      name="java"
                    />}
                  label="Java"
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' align='center' gutterBottom={true}>Market</Typography>
              <Divider />
              <Grid container component={FormGroup} row={true}>
                <Grid item
                  xs={12}
                  md={6}
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.austin}
                      onChange={handleChange}
                      name="austin"
                      />}
                  label="Austin, TX"
                />
                <Grid item
                  xs={12}
                  md={6}
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.charlotte}
                      onChange={handleChange}
                      name="charlotte"
                    />}
                  label="Charlotte, NC"
                />
                <Grid item
                  xs={12}
                  md={6}
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.newYork}
                      onChange={handleChange}
                      name="newYork"
                    />}
                  label="New York, NY"
                />
                <Grid item
                  xs={12}
                  md={6}
                  component={FormControlLabel}
                  control={
                    <Checkbox
                    checked={checkboxes.sanFrancisco}
                    onChange={handleChange}
                    name="sanFrancisco"
                    />}
                  label="San Francisco, CA"
                />
                <Grid item
                  xs={12}
                  md={6}
                  component={FormControlLabel}
                  control={
                    <Checkbox
                      checked={checkboxes.washington}
                      onChange={handleChange}
                      name="washington"
                    />}
                  label="Washington, DC"
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
