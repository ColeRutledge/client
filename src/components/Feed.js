import React, { useState, useContext, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Container, Link } from '@material-ui/core'
import LinkIcon from '@material-ui/icons/Link';
import { useHistory } from 'react-router-dom'

import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const Feed = () => {
  const { auth, setAuth } = useContext(UserContext)
  const [ postings, setPostings ] = useState([])
  const history = useHistory()

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
            { title: 'City', field: 'city' },
            { title: 'State', field: 'state' },
            {
              title: 'Url',
              field: 'url',
              disableClick: true,
              render: posting => <Link href={posting.url} target='_blank'><LinkIcon color='error'/></Link>,
              // headerStyle: {
              //   textAlign: 'right',
              // },
              // cellStyle: {
              //   textAlign: 'right',
              // },
            }
          ]}
          data={postings}
          title="Job Feed"
          options={{ selection: true }}
          detailPanel={posting => {
            return (
              <ul>
                <li>{posting.job_title}</li>
                <li>{posting.company}</li>
                <li>{posting.city}</li>
                <li>{posting.state}</li>
              </ul>
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
