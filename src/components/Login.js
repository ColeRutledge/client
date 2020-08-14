import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TextField, Button, Typography } from '@material-ui/core'
import UserContext from '../context/UserContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL


const Login = () => {
  const { auth, setAuth, setUserId } = useContext(UserContext)
  const [ loginError, setLoginError ] = useState('')
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    console.log(data)
    try {
      const res = await fetch(`${apiUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        let data = await res.json()
        if (data.error) {
          return setLoginError(data.error)
        }
        console.log('Successful fetch!')
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        localStorage.setItem('id', data.id)
        setAuth(data.token)
        setUserId(+data.id)
        console.log(data)
      } else throw res

    } catch (err) {
      console.log(err)
    }
  }

  const errorStyles = {
    padding: '0 13px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
  }

  return (
    <>
      {auth
        ? <Redirect to='/' />
        : <div style={{ display: 'flex', alignItems: 'center', paddingTop: '50px', flexDirection: 'column', marginTop: '75px' }}>
          <h1 style={{ fontSize: 22 }}>Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', width: '40ch' }}
          >
            <TextField
              label='Email Address'
              name='email'
              type='email'
              variant='outlined'
              style={{ margin: '15px 0' }}
              inputRef={register({ required: true, maxLength: 255 })}
            />
            {errors.email?.type === 'required' &&
              <Typography style={errorStyles}
              >Email required.
                </Typography>}
            {errors.email?.type === 'maxLength' &&
              <Typography style={errorStyles}
              >Email cannot exceed 50 characters.
                </Typography>}
            <TextField
              label='Password'
              name='password'
              type='password'
              variant='outlined'
              style={{ margin: '15px 0' }}
              inputRef={register({ required: true, minLength: 6, pattern: /^(?=.*\d)(?=.*[a-z])/ })}
            />
            {errors.password?.type === 'required' &&
              <Typography style={errorStyles}
              >Invalid password.
                </Typography>}
            {errors.password?.type === 'minLength' &&
              <Typography style={errorStyles}
              >Invalid password.
                </Typography>}
            {errors.password?.type === 'pattern' &&
              <Typography style={errorStyles}
              >Invalid password.
                </Typography>}
            {loginError &&
              <Typography style={{ ...errorStyles, marginTop: '2px' }}
              >{loginError}
              </Typography>}
            <Button
              variant='outlined'
              type='submit'
              style={{ margin: '20px 0' }}
            >Submit</Button>
          </form>
        </div>
      }
    </>
  )
}


export default Login
