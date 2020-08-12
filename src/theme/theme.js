import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[100],
    },
    secondary: {
      main: green[200],
    },
  },
})

export default theme
