import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: '150px',
    // bgcolor: 'primary',
  },
}))

const Footer = () => {
  const classes = useStyles()
  const theme = useTheme()

  const footerStyles = {
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    gridTemplateColumns: '5fr 1fr 1fr 5fr',
    width: '100%',
    height: '75px',
    boxShadow: '3px 0 0 0 rgba(21,27,38,.15)',
    backgroundColor: theme.palette.primary.main,
  }


  return (
    <div className={classes.footer} style={footerStyles}>
      <div />
      <a
        target='_blank'
        href='https://github.com/ColeRutledge'
        rel="noopener noreferrer">
          <GitHubIcon fontSize='large' />
      </a>
      <a
      target='_blank'
      href='https://www.linkedin.com/in/colerutledge/'
      rel="noopener noreferrer">
        <LinkedInIcon fontSize='large' />
      </a>
      <div />
  </div>
  )
}

export default Footer
