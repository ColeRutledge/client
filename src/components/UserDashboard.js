import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'


import UserContext from '../context/UserContext'
const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL



const Dashboard = () => {
  const { auth, setAuth, id } = useContext(UserContext)
  const [ searches, setSearches ] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/user/${id || localStorage.getItem('id')}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || auth}` }
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data.user_searches.user_id)
          setSearches({...data})
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

    fetchSearches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {searches !== null &&
        <ul style={{ marginTop: '100px'}}>
          <li>{searches.user_searches.user_id}</li>
          <li>{searches.user_searches.search_radius}</li>
          <li>{searches.user_searches.technologies}</li>
        </ul>
      }
    </>
  )
}

export default Dashboard
