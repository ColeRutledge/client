import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import { Container, Link, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'
import Paper from '@material-ui/core/Paper'

import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
                // spacing={2}
                justify='center'
                alignItems='center'
                direction='row'
                className={classes.root}
              >
                <Grid m={3} item xs={12}>
                  <Paper className={classes.paper}>{posting.snippet}</Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>{posting.source}</Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>{posting.rel_time}</Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>{posting.formatted_location}</Paper>
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
