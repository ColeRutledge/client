import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import UserContext from '../context/UserContext'


const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // marginBottom: '100px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  profileMenu: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  }
}))

export default function MenuBar() {
  const classes = useStyles()
  const { auth, setAuth } = useContext(UserContext)
  const [ pAnchor, setPAnchor ] = useState(null)
  const [ mAnchor, setMAnchor ] = useState(null)
  const pOpen = Boolean(pAnchor)
  const mOpen = Boolean(mAnchor)


  const logout = (e) => {
    handlePClose(e)
    localStorage.removeItem('token')
    setAuth('')
    // history.push('/login')
  }

  const handlePMenu = (event) => {
    setPAnchor(event.currentTarget)
  }

  const handlePClose = () => {
    setPAnchor(null)

  }

  const handleMMenu = (event) => {
    setMAnchor(event.currentTarget)
  }

  const handleMClose = () => {
    setMAnchor(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={mAnchor}
            keepMounted
            open={mOpen}
            onClose={handleMClose}
          >
            {auth
              ? <div>
                  <MenuItem onClick={handleMClose} component={Link} to='/'>
                    <Typography>Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleMClose} component={Link} to='/feed'>
                    <Typography>Feed</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleMClose} component={Link} to='/bookmarks'>
                    <Typography>Bookmarks</Typography>
                  </MenuItem>
                </div>
              : <div>
                  <MenuItem component={Link} onClick={handleMClose} to='/login'>
                    <Typography>Login</Typography>
                  </MenuItem>
                  <MenuItem component={Link} onClick={handleMClose} to='/register'>
                    <Typography>Register</Typography>
                  </MenuItem>
                </div>
            }
          </Menu>
          {auth && (
            <div className={classes.profileMenu}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handlePMenu}
                color="inherit"
                style={{ justifySelf: 'flex-end' }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={pAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={pOpen}
                onClose={handlePClose}
              >
                <MenuItem onClick={logout} component={Link} to='/login'>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
