import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import MenuBar from './MenuBar'
import Feed from './Feed'
import Bookmarks from './Bookmarks'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './Dashboard'
// import Footer from './Footer'


const Routes = () => {
  return (
    <BrowserRouter>
        <MenuBar />
        <Switch>
          <Route exact path='/login' render={() => <Login />} />
          <Route exact path='/register' render={() => <Register />} />
          <ProtectedRoute exact path='/' component={Dashboard} />
          <ProtectedRoute exact path='/feed' component={Feed} />
          <ProtectedRoute exact path='/bookmarks' component={Bookmarks} />
        </Switch>
        {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default Routes
