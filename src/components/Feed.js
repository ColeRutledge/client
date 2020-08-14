import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import { Container, Link, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'
import Paper from '@material-ui/core/Paper'

import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '5px 0',
  },
  paper: {
    padding: theme.spacing(2),
    margin: '0 10px',
    textAlign: 'center',
    color: theme.palette.secondary,
  },
}))


const Feed = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ postings, setPostings ] = useState([])
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/posting`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setPostings([...data])
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

    fetchFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container >
      {postings.length > 0 &&
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Title', field: 'job_title' },
            { title: 'Company', field: 'company' },
            { title: 'Location', field: 'formatted_location' },
            {
              title: 'Url',
              field: 'url',
              disableClick: true,
              render: posting => (
              <Link href={posting.url} target='_blank'>
                <LinkIcon color='error'/>
              </Link>
              ),
              // headerStyle: {
              //   textAlign: 'right',
              // },
              // cellStyle: {
              //   textAlign: 'right',
              // },
            },
            // { title: 'State', field: 'state' },
          ]}
          data={postings}
          title='Job Feed'
          options={{ selection: true }}
          detailPanel={posting => {
            return (
              <Grid
                container
                spacing={1}
                justify='center'
                alignItems='center'
                direction='row'
                className={classes.root}
              >
                <Grid item xs={12}>
                  <Paper className={classes.paper}><Typography>{posting.snippet}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography>Source: {posting.source}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography>{posting.rel_time}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography>{posting.formatted_location}</Typography></Paper>
                </Grid>
              </Grid>
            )
          }}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      </div>
      }
  </Container>
  )
}

export default Feed