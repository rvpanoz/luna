/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import { layoutStyles } from 'styles/containers'
import { APP_MODES } from 'constants/AppConstants'
import Grid from 'material-ui/Grid'
import React from 'react'
import PropTypes from 'prop-types'

import SnackBar from 'common/SnackBar'
import PackagesContainer from 'containers/Packages'
import AppHeader from 'components/header/AppHeader'

class Layout extends React.Component {
  constructor() {
    super()
    this.setGlobalMode = this.setGlobalMode.bind(this)
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
  }
  setGlobalMode() {
    const {
      toggleLoader,
      setPackages,
      toggleSnackbar,
      setActive,
      setMode
    } = this.props

    setPackages([])
    toggleSnackbar(true)
    toggleLoader(true)
    setActive(null)
    setMode(APP_MODES.GLOBAL)
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      cmd: ['outdated', 'list'],
      mode: APP_MODES.GLOBAL
    })
  }
  handleSnackBarClose() {
    const { toggleSnackbar } = this.props
    toggleSnackbar(false)
  }
  render() {
    const {
      classes,
      mode,
      theme,
      menuOpen,
      snackbar,
      snackBarOpen,
      handleDrawerOpen,
      handleDrawerClose,
      setMode
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
          {snackBarOpen ? (
            <SnackBar
              snackBarOpen={snackBarOpen}
              handleSnackBarClose={this.handleSnackBarClose}
              action={snackbar.action ? this.setGlobalMode : null}
              actionText={snackbar.actionText}
              message={snackbar.message}
            />
          ) : null}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    snackbar: state.global.snackbar,
    menuOpen: state.global.menuOpen,
    snackBarOpen: state.global.snackBarOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActive: (active) => dispatch(packagesActions.setActive(active)),
    setPackages: (packages) => dispatch(packagesActions.setPackages(packages)),
    setMode: (mode, directory) =>
      dispatch(globalActions.setMode(mode, directory)),
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    toggleLoader: () => dispatch(globalActions.toggleLoader(true)),
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
