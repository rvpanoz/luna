import purple from 'material-ui/colors/purple'
import pink from 'material-ui/colors/pink'
import deepPurple from 'material-ui/colors/deepPurple'
import red from 'material-ui/colors/red'

const primary = red[500] // #F44336
const accent = purple['A200'] // #E040FB

const themeA = {
  palette: {
    primary: {
      light: purple[100],
      main: purple[400],
      dark: purple[700],
      contrastText: '#fff'
    },
    secondary: {
      light: pink[100],
      main: pink[400],
      dark: pink[700],
      contrastText: '#000'
    }
  }
}

export { themeA }
