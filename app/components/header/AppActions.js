import { autoBind, firstToUpper } from '../../utils'
import { remote, ipcRenderer } from 'electron'
import { toggleLoader, toggleSettings, setMode } from 'actions/globalActions'
import { setActive } from 'actions/packagesActions'
import { APP_MODES } from 'constants/AppConstants'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import AnalyzeIcon from 'material-ui-icons/Code'
import Icon from 'material-ui/Icon'
import RefreshIcon from 'material-ui-icons/Refresh'
import SettingsIcon from 'material-ui-icons/Settings'
import SearchBox from 'components/header/SearchBox'
import Snackbar from 'material-ui/Snackbar'
import Divider from 'material-ui/Divider'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  actions: {
    margin: theme.spacing.unit
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing.unit
  },
  searchBox: {
    position: 'fixed',
    right: 0,
    top: 0,
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
})

const SnackbarAction = (props) => {
  const { updateMode } = props
  return (
    <Button color="accent" size="small" onClick={(e) => updateMode()}>
      global
    </Button>
  )
}

class AppActions extends React.Component {
  constructor() {
    super()
    this.state = {
      snackBarOpen: true
    }
    this._anchorEl = null
    autoBind(['handleClick', 'handleClose', 'analyze', 'updateMode'], this)
  }
  handleClick(e) {
    this._anchorEl = e.currentTarget
    this.forceUpdate()
  }
  handleClose() {
    this._anchorEl = null
    this.forceUpdate()
  }
  handleSnackBarClose() {
    this.setState({
      snackBarOpen: false
    })
  }
  updateMode(directory) {
    if (!directory) {
      this.props.toggleLoader(true)
      this.props.setActive(null)
      this.props.setMode(APP_MODES.GLOBAL)
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'get-packages',
        cmd: ['outdated', 'list'],
        mode: APP_MODES.GLOBAL
      })
      return
    }
    ipcRenderer.send('analyze-json', directory)
  }
  analyze(e) {
    e.preventDefault()

    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'json',
            extensions: ['json']
          }
        ],
        openFile: true
      },
      (filePath) => {
        if (filePath) {
          this.updateMode(filePath[0])
        }
      }
    )
  }
  render() {
    const { classes, mode, directory, ...rest } = this.props
    const { snackBarOpen } = this.state
    const ITEM_HEIGHT = 45

    return (
      <div className={classes.container}>
        <div className={classes.actions}>
          <Button
            variant="fab"
            color="primary"
            aria-label="analyze"
            className={classes.button}
            onClick={this.analyze}
          >
            Analyze
            <AnalyzeIcon />
          </Button>
          <Button
            variant="fab"
            color="accent"
            aria-label="reload"
            className={classes.button}
          >
            Reload
            <RefreshIcon />
          </Button>
          <Button
            variant="fab"
            aria-label="settings"
            color="default"
            className={classes.button}
          >
            Settings
            <SettingsIcon />
          </Button>
        </div>
        <div className={classes.searchBox}>
          <SearchBox {...rest} />
        </div>
        {mode === APP_MODES.LOCAL ? (
          <Snackbar
            resumeHideDuration={5}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snackBarOpen}
            onClose={this.handleClose}
            SnackbarContentProps={{
              'aria-describedby': 'workspace'
            }}
            action={<SnackbarAction updateMode={this.updateMode} />}
            message={
              <span id="workspace">
                Working in {firstToUpper(APP_MODES.LOCAL)} mode
                {<Divider />}
                {directory}
              </span>
            }
          />
        ) : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMode: (mode, directory) => dispatch(setMode(mode, directory)),
    setActive: (active) => dispatch(setActive(active)),
    toggleSettings: (bool) => dispatch(toggleSettings(bool)),
    toggleLoader: (bool) => dispatch(toggleLoader(bool))
  }
}

AppActions.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(AppActions)
