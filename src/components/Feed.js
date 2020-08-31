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
    padding: '5px 0',
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

  const bookmark = async (rows, row) => {
    // console.log(rows, row)
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
        console.log(data)
        // setPostings([...data])
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


  return (
    <Container>
      {postings.length > 0 &&
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          data={postings}
          title='Job Feed'
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          onSelectionChange={(rows, row) => bookmark(rows, row)}
          localization={{
            toolbar: {
              nRowsSelected: `{0} posting(s) bookmarked`
            },
          }}
          options={{
            selection: true,
            // selectionProps: ,
            showSelectAllCheckbox: false,
            rowStyle: { backgroundColor: '#EEE' },
            // headerStyle: { backgroundColor: '#02203c', color: '#FFF' },
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
            grouping: true,
          }}
          columns={[
            { title: 'Title', field: 'title' },
            { title: 'Company', field: 'company' },
            { title: 'Location', field: 'search_loc' },
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
      </div>
      }
  </Container>
  )
}

export default Feed
