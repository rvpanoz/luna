import React from 'react'
import Menu, { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'

const CardVersions = (props) => {
  const { active, classes, onChangeVersion } = props

  return (
    <TextField
      select
      label="Select Version"
      className={classes.textField}
      value={active.version}
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
        active.versions.map((version, key) => (
          <MenuItem key={key} value={version}>
            {version}
          </MenuItem>
        ))}
    </TextField>
  )
}

export default CardVersions
