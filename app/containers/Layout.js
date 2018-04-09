/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { layoutStyles } from 'styles/layoutStyles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import classnames from 'classnames'
import Grid from 'material-ui/Grid'
import React from 'react'
import PropTypes from 'prop-types'
import Settings from 'common/Settings'
import SnackBar from 'common/SnackBar'
import AppHeader from 'components/header/AppHeader'
import PackagesContainer from 'containers/Packages'

class Layout extends React.Component {
  constructor() {
    super()
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
  }
  handleSnackBarClose() {
    const { toggleSnackbar } = this.props
    toggleSnackbar(false)
  }
  componentDidMount() {
    const { setSettings } = this.props

    ipcRenderer.on('settings_loaded', (event, settings) => {
      console.log('settings_loaded', settings)
      if (settings && typeof settings === 'object') {
        setSettings(settings)
      }
    })

    ipcRenderer.on('settings_saved', (event, settings) => {
      console.log('settings_saved', settings)
      if (settings && typeof settings === 'object') {
        setSettings(settings)
      }
    })
  }
  render() {
    const {
      classes,
      menuOpen,
      snackbar,
      snackBarOpen,
      handleDrawerOpen,
      handleDrawerClose,
      handleSettingsOpen,
      handleSettingsClose,
      settingsOpen,
      settings
    } = this.props

    return (
      <div className={classes.wrapper}>
        <AppHeader
          menuOpen={menuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleSettingsOpen={handleSettingsOpen}
        />
        <main className={classnames(classes.content, 'page-content')}>
          <PackagesContainer />
          {settingsOpen ? (
            <Settings
              open={settingsOpen}
              settings={settings}
              handleSettingsClose={handleSettingsClose}
            />
          ) : null}
          <SnackBar
            snackBarOpen={snackBarOpen}
            handleSnackBarClose={this.handleSnackBarClose}
            actionText={snackbar.actionText}
            message={snackbar.message}
            position={snackbar.position}
          />
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    settings: state.global.settings,
    snackbar: state.global.snackbar,
    menuOpen: state.global.menuOpen,
    settingsOpen: state.global.settingsOpen,
    snackBarOpen: state.global.snackBarOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSettings: (settings) => dispatch(globalActions.setSettings(settings)),
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false)),
    handleSettingsOpen: () => dispatch(globalActions.toggleSettings(true)),
    handleSettingsClose: () => dispatch(globalActions.toggleSettings(false))
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
