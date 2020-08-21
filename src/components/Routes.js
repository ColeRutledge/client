import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import MenuBar from './MenuBar'
import Feed from './Feed'
import ProtectedRoute from './ProtectedRoute'


const Routes = () => {
  return (
    <BrowserRouter>
      <MenuBar />
      <Switch>
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/register' render={() => <Register />} />
        <ProtectedRoute exact path='/' component={Feed} />
        <ProtectedRoute exact path='/feed' component={Feed} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
