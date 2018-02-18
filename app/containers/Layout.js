/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import { styles } from './styles'
import { APP_MODES, NPM_CONFIG_VALUES } from 'constants/AppConstants'
import { merge } from 'ramda'
import { autoBind } from '../utils'
import Grid from 'material-ui/Grid'
import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from 'components/header/AppHeader'
import PackagesContainer from './Packages'

class Layout extends React.Component {
  render() {
    const {
      classes,
      mode,
      theme,
      menuOpen,
      handleDrawerOpen,
      handleDrawerClose
    } = this.props

    return (
      <div className={classes.root}>
        <AppHeader
          menuOpen={menuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
        />
        <main className={classes.content}>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={12}>
              <PackagesContainer />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    menuOpen: state.global.menuOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false))
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout)
