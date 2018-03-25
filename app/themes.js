import purple from 'material-ui/colors/purple'
import pink from 'material-ui/colors/pink'
import deepPurple from 'material-ui/colors/deepPurple'
import red from 'material-ui/colors/red'
import deepOrange from 'material-ui/colors/deepOrange'

const primaryColor = '#9c27b0'
const warningColor = '#ff9800'
const dangerColor = '#f44336'
const successColor = '#4caf50'
const infoColor = '#00acc1'
const roseColor = '#e91e63'
const grayColor = '#999999'
const primary = red[500] // #F44336
const accent = purple['A200'] // #E040FB

const themeA = {
  palette: {
    primary: {
      light: purple[300],
      main: purple[400],
      dark: deepOrange[700],
      contrastText: '#fff'
    },
    secondary: {
      light: pink[100],
      main: pink[400],
      dark: pink[600],
      contrastText: '#000'
    }
  }
}

export { themeA }
