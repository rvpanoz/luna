import Menu, { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import React from 'react'
import PropTypes from 'prop-types'

const { object, func } = PropTypes
const styles = (theme) => {
  return {
    textField: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    }
  }
}

class CardVersions extends React.Component {
  render() {
    const { active, classes, latest, onChangeVersion } = this.props

    return (
      <TextField
        select
        label="Select Version"
        className={classes.textField}
        value={active.latest || active.version}
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
    )
  }
}

CardVersions.propTypes = {
  active: object.isRequired,
  classes: object.isRequired,
  onChangeVersion: func.isRequired
}

export default withStyles(styles)(CardVersions)
