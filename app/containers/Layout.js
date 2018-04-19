/**
 * Layout component
 *
 */

import { ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Settings from 'common/Settings'
import SnackBar from 'common/SnackBar'
import AppHeader from 'components/header/AppHeader'
import PackagesContainer from 'containers/Packages'

const styles = (theme) => ({
  wrapper: {
    position: 'relative',
    top: 0,
    height: '100%',
    overflow: 'hidden'
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    marginTop: 50,
    marginLeft: 50,
    padding: 25,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  '.page-content': {
    marginTop: '65px',
    flex: '1 1 100%',
    margin: '0 5px'
  }
})

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
    const { setSettings, toggleSnackbar } = this.props

    ipcRenderer.on('settings_loaded', (event, settings) => {
      if (settings && typeof settings === 'object') {
        setSettings(settings)
      }
    })
    ipcRenderer.on('settings_saved', (event, settings) => {
      if (settings && typeof settings === 'object') {
        setSettings(settings)
      }
    })
    ipcRenderer.on('uncaught-exception', (event, exceptionError) => {
      console.error('uncaught-exception', exceptionError)

      toggleSnackbar(true, {
        loader: false,
        actionText: 'Dismiss',
        message: exceptionError,
        position: {
          vertical: 'bottom',
          horizontal: 'center'
        }
      })
    })
  }
  componentWillUnmount() {
    ;['settings_saved', 'settings_saved', 'uncaught-exception'].forEach(
      (eventName) => ipcRenderer.removeListener(eventName)
    )
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
      toggleSnackbar,
      loading,
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
          <PackagesContainer
            toggleSnackbar={toggleSnackbar}
            settings={settings}
          />
          <Settings
            open={settingsOpen}
            settings={settings || {}}
            handleSettingsClose={handleSettingsClose}
          />
          <SnackBar
            snackBarOpen={snackBarOpen}
            handleSnackBarClose={this.handleSnackBarClose}
            actionText={snackbar.actionText}
            loader={snackbar.loader}
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
    toggleSnackbar: (bool, options) =>
      dispatch(globalActions.toggleSnackbar(bool, options)),
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
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout)
