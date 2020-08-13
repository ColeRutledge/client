import React, { useState } from 'react'

import UserContext from './context/UserContext'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/theme'
import Routes from './components/Routes'

function App() {
  const [ auth, setAuth ] = useState(localStorage.getItem('token') || '')

  const context = {
    auth,
    setAuth
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
