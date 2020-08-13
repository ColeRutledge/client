import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'


const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: blue[200],
    },
    secondary: {
      main: blue[500],
    },
    error: {
      main: red[300],
    },
  },
})

export default theme
