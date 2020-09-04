import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import { Container, Link, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'
import Paper from '@material-ui/core/Paper'

import UserContext from '../context/UserContext'
import SearchWidget from './SearchWidget'
import Footer from './Footer'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '10px 0',
    backgroundColor: '#EEE',
  },
  paper: {
    padding: theme.spacing(2),
    margin: '0 10px',
    textAlign: 'center',
    color: theme.palette.secondary,
  },
}))


const Feed = () => {
  const history = useHistory()
  const classes = useStyles()
  const {
    auth,
    setAuth,
    postings,
    setPostings,
    feed,
    setFeed,
    filters,
    setFilters } = useContext(UserContext)

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/posting`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          // console.log(data)
          setFeed([...data])
          setPostings([...data])
        } else throw res

      } catch (err) {
        if (err.status === 401) {
          localStorage.removeItem('token')
          setAuth('')
          history.push('/login')
        }
        // console.dir(err)
        console.error(err)
      }
    }

    if (postings === null) fetchFeed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const filterByOptions = (name, checked) => {
    let filteredFeed = postings.slice()
    console.log(name, checked)
    const tech = ['javascript', 'python', 'java', 'ruby']
    const oMap = {
      austin: 'Austin, TX',
      boston: 'Boston, MA',
      charlotte: 'Charlotte, NC',
      newYork: 'New York, NY',
      sanFrancisco: 'San Francisco, CA',
      seattle: 'Seattle, WA',
      washington: 'Washington, DC',
      javascript: 'javascript developer',
      python: 'python developer',
      java: 'java developer',
      ruby: 'ruby developer',
    }

    if (checked) {

      const ff = filters.filter(filter => filter !== name)
      ff.forEach(filter => {
        filteredFeed = filteredFeed.filter(posting => {
          if (tech.includes(filter)) {
            return posting.search_terms !== oMap[filter]
          } else {
            return posting.search_loc !== oMap[filter]
          }
        })
      })

      setFilters([ ...ff ])
      setFeed([ ...filteredFeed ])
    } else {
      setFilters([ ...filters, name ])
      filteredFeed = feed.filter(posting => {
        return tech.includes(name) ? posting.search_terms !== oMap[name] : posting.search_loc !== oMap[name]
      })
      setFeed([ ...filteredFeed ])
    }
  }

  const bookmark = async (rows, row) => {
    try {
      const res = await fetch(`${apiUrl}/api/user/bookmark`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row_id: row.id, checked: row.tableData.checked })
      })

      if (res.ok) {
        const data = await res.json()
        // console.log(data)
        // setPostings([...data])
      } else throw res

    } catch (err) {
      if (err.status === 401) {
        localStorage.removeItem('token')
        setAuth('')
        history.push('/login')
      }
      // console.dir(err)
      console.error(err)
    }
  }


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
    }}
    >
      <Container disableGutters={true}>
        <SearchWidget filterByOptions={filterByOptions}/>
        <MaterialTable
          data={feed}
          title='Job Feed'
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          onSelectionChange={(rows, row) => bookmark(rows, row)}
          localization={{
            toolbar: { nRowsSelected: `{0} posting(s) bookmarked` },
            body: { emptyDataSourceMessage: postings ? 'No postings that match that criteria.' : 'Loading...' },
          }}
          options={{
            selection: true,
            // selectionProps: ,
            showSelectAllCheckbox: false,
            rowStyle: { backgroundColor: '#EEE' },
            headerStyle: { backgroundColor: '#EEE' },
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
            grouping: true,
          }}
          columns={[
            {
              title: 'Title',
              field: 'title',
              cellStyle: { whiteSpace: 'nowrap' },
            },
            {
              title: 'Company',
              field: 'company',
              cellStyle: { whiteSpace: 'nowrap' },
            },
            {
              title: 'Location',
              field: 'search_loc',
              cellStyle: { whiteSpace: 'nowrap' },
            },
            {
              title: 'Link',
              field: 'link',
              disableClick: true,
              sorting: false,
              render: posting => (
              <Link href={posting.link} target='_blank'>
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
                  <Paper className={classes.paper}>
                    <Typography>{posting.snippet}...</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Typography>Salary: {posting.salary === 'None' ? 'N/A' : posting.salary}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Typography>{posting.date}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    <Typography>{posting.location}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            )
          }}
        />
      </Container>
      <Footer />
    </div>
  )
}

export default Feed
