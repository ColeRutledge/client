import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UserContext from './context/UserContext'
import UiTest from './components/UiTest'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/theme'

function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token') || '')

  const context = {
    auth,
    setAuth
  }


  return (
    <UserContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <div>Hello from the React App!</div>
        <BrowserRouter>
          <NavLink exact to='/'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/uitest'>UI Test</NavLink>
          <Switch>
            <Route exact path='/' render={() => <Login />} />
            <Route exact path='/register' render={() => <Register />} />
            <Route exact path='/uitest' render={() => <UiTest />} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App
