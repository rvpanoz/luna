/**
 * CardVersions component
 */

import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import semverCompare from 'semver-compare'
import TextField from 'material-ui/TextField'

const { object, func } = PropTypes
const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    margin: {
      margin: theme.spacing.unit
    },
    button: {
      maxWidth: '100%'
    },
    textField: {
      margin: theme.spacing.unit,
      minWidth: 120
    }
  }
}

class CardVersions extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { active, setVersion } = this.props
    const { version, latest } = active || {}

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
          select
          className={classes.textField}
          value={latest || active.version}
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
