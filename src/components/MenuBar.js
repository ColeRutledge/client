import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function MenuBar() {
  const classes = useStyles()
  const [ auth ] = useState(true)
  const [ pAnchor, setPAnchor ] = useState(null)
  const [ mAnchor, setMAnchor ] = useState(null)
  const pOpen = Boolean(pAnchor)
  const mOpen = Boolean(mAnchor)



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
      <AppBar position="static">
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
            <MenuItem onClick={handleMClose} component={Link} to='/feed'>
              <Typography>Feed</Typography>
            </MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Menu
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handlePMenu}
                color="inherit"
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
                <MenuItem onClick={handlePClose} component={Link} to='/login'>
                  <Typography>Login</Typography>
                </MenuItem>
                <MenuItem component={Link} onClick={handlePClose} to='/register'>
                  <Typography>Register</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
