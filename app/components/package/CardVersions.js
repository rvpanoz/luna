/**
 * CardVersions component
 */

import Menu, { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import semverCompare from 'semver-compare'

const { object, func } = PropTypes
const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    button: {
      margin: theme.spacing.unit
    },
    textField: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    }
  }
}

class CardVersions extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    const { active, setVersion } = this.props
    const { version, latest } = active

    if (latest && typeof latest === 'string') {
      const notEqual = semverCompare(latest, version)
      if (notEqual) {
        setVersion(latest)
      }
    }
  }
  render() {
    const { active, classes, latest, onChangeVersion, version } = this.props

    if (!active || active.error) {
      return null
    }

    return (
      <div className={classes.root}>
        <TextField
          ref="versionInput"
          select
          label="Select Version"
          className={classes.textField}
          value={version || active.version}
          onChange={onChangeVersion}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="preview the selected version"
          margin="normal"
        >
          {active &&
            active.versions &&
            active.versions.map((version, key) => (
              <MenuItem key={key} value={version}>
                {version}
              </MenuItem>
            ))}
        </TextField>
        <Button
          color="primary"
          onClick={(e) => {
            const version = this.refs && this.refs['versionInput']
            const { onChangeVersion } = this.props

            onChangeVersion(e, version.props && version.props.value)
          }}
        >
          Preview
        </Button>
      </div>
    )
  }
}

CardVersions.propTypes = {
  active: object.isRequired,
  classes: object.isRequired,
  onChangeVersion: func.isRequired
}

export default withStyles(styles)(CardVersions)
