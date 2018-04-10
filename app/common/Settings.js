/**
 * Settings modal
 **/

import { ipcRenderer } from 'electron'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { autoBind } from 'utils'
import { merge } from 'ramda'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Divider from 'material-ui/Divider'

const styles = {}

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchGithub: false
    }
    autoBind(['handleChange', 'saveSettings'], this)
  }
  componentDidMount() {
    const { settings } = this.props

    if (settings) {
      this.setState(merge(this.state, settings))
    }
  }
  handleChange(e) {
    const { name } = e.target
    this.setState({ [name]: e.target.checked })
  }
  saveSettings() {
    const { handleSettingsClose } = this.props

    ipcRenderer.send('save-settings', this.state)
    handleSettingsClose()
  }
  render() {
    const { classes, handleSettingsClose, open, settings } = this.props
    const { fetchGithub, registry } = this.state

    if (!settings) {
      return null
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleSettingsClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Settings</DialogTitle>
          <Divider light={true} />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControlLabel
                control={
                  <Switch
                    checked={fetchGithub}
                    onChange={(e) => this.handleChange(e)}
                    name="fetchGithub"
                    color="primary"
                  />
                }
                label="Fetch Github stats"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.saveSettings} color="primary">
              Save
            </Button>
            <Button onClick={handleSettingsClose} color="accent">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

export default withStyles(styles)(Settings)
