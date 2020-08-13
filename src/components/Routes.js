import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import MenuBar from './MenuBar'
import Feed from './Feed'


const Routes = () => {
  return (
    <BrowserRouter>
      <MenuBar />
      <Switch>
        <Route exact path='/login' render={() => <Login />} />
        <Route exact path='/feed' render={() => <Feed />} />
        <Route exact path='/register' render={() => <Register />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
