import React, { useState } from 'react'

import UserContext from './context/UserContext'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/theme'
import Routes from './components/Routes'

function App() {
  const [ auth, setAuth ] = useState(localStorage.getItem('token') || '')
  const [ userId, setUserId ] = useState(+localStorage.getItem('id') || null)
  const [ postings, setPostings ] = useState(null)
  const [ options, setOptions ] = useState({
    javascript: true,
    python: true,
    ruby: true,
    java: true,
    austin: true,
    charlotte: true,
    newYork: true,
    sanFrancisco: true,
    washington: true,
    consulting: true,
    filter: false,
  })

  const context = {
    auth,
    setAuth,
    userId,
    setUserId,
    postings,
    setPostings,
    options,
    setOptions,
  }


  return (
    <UserContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
