import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UserContext from './context/UserContext'


function App() {
  const [auth, setAuth] = useState(localStorage.getItem('token') || '')

  const context = {
    auth,
    setAuth
  }

  return (
    <UserContext.Provider value={context}>
      <div>Hello from the React App!</div>
      <BrowserRouter>
        <NavLink to='/register'>Register</NavLink>
        <Switch>
          <Route exact path='/' render={() => <Login />} />
          <Route exact path='/register' render={() => <Register />} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
