/**
Layout component
* */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import * as globalActions from 'actions/globalActions'
import { styles } from './styles'
import { NPM_CONFIG_VALUES } from 'constants/AppConstants'
import { merge } from 'ramda'
import { autoBind } from '../utils'
import React from 'react'
import PropTypes from 'prop-types'
import AppHeader from 'components/header/AppHeader'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { SnackbarContent } from 'material-ui/Snackbar'
import Modal from 'material-ui/Modal'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import PackagesContainer from './Packages'

class Layout extends React.Component {
  constructor() {
    super()
    autoBind(['handleModal', 'onChangeNpmSetting', 'setNpmRegistry'], this)
  }
  handleModal() {
    const { closeSettings } = this.props
    closeSettings()
  }
  componentDidMount() {
    const { setSettings } = this.props

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-settings',
      cmd: 'config',
      pkgName: 'list' // hack
    })

    ipcRenderer.on('get-settings-close', (event, settings) => {
      try {
        const settingsList = JSON.parse(settings)
        setSettings(settingsList)
      } catch (e) {
        throw new Error(e)
      }
    })
  }
  onChangeNpmSetting(e) {
    const { setSettings, settings } = this.props
    const inputEl = e.currentTarget
    const setting = inputEl && inputEl.getAttribute('setting')
    const value = inputEl && inputEl.value

    let stateObj = {}
    if (value && setting) {
      stateObj[setting] = value
      setSettings(merge(settings, stateObj))
    }
  }
  setNpmRegistry(e) {
    const { settings } = this.props
    const registry = settings.registry
    const cmd = 'set registry [0]'

    ipcRenderer.send('ipc-event', {
      ipcEvent: 'set-registry',
      cmd: [cmd.replace('[0]', registry)]
    })
  }
  getModalStyles() {
    function rand() {
      return Math.floor(Math.random() * 20) - 10
    }

    const top = 50 + rand()
    const left = 50 + rand()

    return {
      position: 'absolute',
      width: 8 * 50,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid #e5e5e5',
      backgroundColor: '#fff',
      boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
      padding: 8 * 4
    }
  }
  render() {
    const {
      classes,
      theme,
      settings,
      menuOpen,
      handleDrawerOpen,
      settingsOpen,
      handleDrawerClose
    } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppHeader
            title="Luna"
            theme={theme}
            menuOpen={menuOpen}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
          <main className={classes.content}>
            <Grid container justify="space-between">
              <Grid item xs={12}>
                <PackagesContainer />
              </Grid>
            </Grid>
          </main>
          <div className="app-modal">
            <Modal
              aria-labelledby="settings"
              aria-describedby="set npm settings"
              open={settingsOpen}
              onClose={this.handleModal}
            >
              <div style={this.getModalStyles()} className={classes.paper}>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <h3 className={classes.heading}>Settings</h3>
                  <Divider />
                  <TextField
                    inputProps={{
                      setting: NPM_CONFIG_VALUES.REGISTRY
                    }}
                    label="Registry"
                    defaultValue={settings && settings.registry}
                    className={classes.textField}
                    onChange={this.onChangeNpmSetting}
                    margin="normal"
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Button
                      className={classes.button}
                      onClick={this.setNpmRegistry}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={this.handleModal}
                      className={classes.button}
                    >
                      Close
                    </Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    menuOpen: state.global.menuOpen,
    settingsOpen: state.global.settingsOpen,
    settings: state.global.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSettings: (settings) => dispatch(globalActions.setSettings(settings)),
    closeSettings: () => dispatch(globalActions.toggleSettings(false)),
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
