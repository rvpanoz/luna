/**
 * Root Component
 *
 */

import { Provider } from 'react-redux'
import main from '../themes/main'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import React from 'react'
import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import CssBaseline from 'material-ui/CssBaseline'
import Layout from './Layout'

const App = (props) => {
  const { store } = props
  const theme = createMuiTheme({})

  return (
    <section id="root">
      <CssBaseline />
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Layout />
        </MuiThemeProvider>
      </Provider>
    </section>
  )
}

export default App
