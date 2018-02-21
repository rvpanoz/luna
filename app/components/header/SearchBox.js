/**
 * SearchBox component
 *
 */

import { ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import TextField from 'material-ui/TextField'
import { searchBoxStyles } from '../../styles/components'

class SearchBox extends React.Component {
  constructor() {
    super()
    this._onKeyUp = this._onKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  _onKeyUp(e) {
    const el = e.target
    const key = e.which || e.keyCode || 0

    if (key === 13) {
      this.handleChange(e)
    }
    return false
  }
  componentDidMount() {
    const root = this.refs.root
    if (root) {
      root.addEventListener('keypress', this._onKeyUp)
    }
  }
  handleChange(e) {
    if (e) {
      e.preventDefault()
    }
    const {
      toggleLoader,
      setActive,
      mode,
      directory,
      setPackageActions
    } = this.props
    const value = e.target.value

    if (value) {
      toggleLoader(true)
      setActive(null)
      setPackageActions([
        {
          text: 'Install',
          iconCls: 'add',
          color: 'accent'
        }
      ])
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'search-packages',
        cmd: ['search'],
        pkgName: value,
        mode,
        directory
      })
    }
    return false
  }
  render() {
    const value = this.state
    const { classes } = this.props

    return (
      <div ref="root" className={classes.root}>
        <TextField
          id="search"
          color="secondary"
          label="Search npm"
          InputLabelProps={{ className: classes.searchBoxLabel }}
          inputProps={{ className: classes.searchBoxInput }}
        />
      </div>
    )
  }
}

export default withStyles(searchBoxStyles)(SearchBox)
