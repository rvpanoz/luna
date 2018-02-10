import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'

const CardDetails = (props) => {
  const { active, classes, version, onChangeVersion } = props

  return (
    <section>
      <TextField
        select
        label="Version"
        className={classes.textField}
        value={version}
        onChange={onChangeVersion}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        helperText="Select version"
        margin="normal"
      >
        {active &&
          active.versions.map((version, key) => (
            <MenuItem key={key} value={version}>
              {version}
            </MenuItem>
          ))}
      </TextField>
    </section>
  )
}

export default CardDetails
