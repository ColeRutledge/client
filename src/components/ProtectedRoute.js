import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import UserContext from '../context/UserContext'


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(UserContext)

  return (
    <Route {...rest} render={(props) => (
      auth ? <Component {...props} /> : <Redirect to='/login' />)} />
  )
}

export default ProtectedRoute
