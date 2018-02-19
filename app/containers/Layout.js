/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import { layoutStyles } from '../styles/containers'
import { APP_MODES, NPM_CONFIG_VALUES } from 'constants/AppConstants'
import { merge } from 'ramda'
import { autoBind } from '../utils'
import Grid from 'material-ui/Grid'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'

import Messages from 'components/common/Messages'
import PackagesContainer from 'containers/Packages'
import AppHeader from 'components/header/AppHeader'

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
            <Grid item xs={11}>
              <PackagesContainer />
            </Grid>
            <Grid item xs={1} />
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
  withStyles(layoutStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout)
