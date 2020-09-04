import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import { Container, Link, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LinkIcon from '@material-ui/icons/Link'
import Paper from '@material-ui/core/Paper'

import UserContext from '../context/UserContext'
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


const Bookmarks = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ bookmarks, setBookmarks ] = useState([])
  const history = useHistory()
  const classes = useStyles()

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/user/bookmark`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setBookmarks([...data])
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

    fetchBookmarks()
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
        body: JSON.stringify({row_id: row.id, checked: row.tableData.checked })
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        setBookmarks([...data])
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
    }}
    >
      <Container >
        <MaterialTable
          data={bookmarks}
          title='Bookmarks'
          showEmptyDataSourceMessage
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          onSelectionChange={(rows, row) => bookmark(rows, row)}
          localization={{
            body: { emptyDataSourceMessage: 'You currently have no bookmarks.' },
          }}
          options={{
            selection: true,
            showSelectAllCheckbox: false,
            selectionProps: {
              checked: true,
            },
            rowStyle: { backgroundColor: '#EEE' },
            // headerStyle: { backgroundColor: '#02203c', color: '#FFF' },
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
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
      <Footer/>
    </div>
  )
}

export default Bookmarks
