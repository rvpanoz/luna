import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import CardOptions from './CardOptions'
import { APP_MODES } from 'constants/AppConstants'

const CardDetails = (props) => {
  const {
    active,
    classes,
    version,
    onChangeVersion,
    cmdOptions,
    group,
    mode,
    addCommandOption,
    clearCommandOptions
  } = props

  return (
    <section className={classes.details}>
      <div>
        <TextField
          select
          label="Select Version"
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
      </div>
      {mode && mode === APP_MODES.LOCAL ? (
        <div>
          <CardOptions
            classes={classes}
            cmdOptions={cmdOptions}
            group={group}
            active={active}
            addCommandOption={addCommandOption}
            clearCommandOptions={clearCommandOptions}
          />
        </div>
      ) : null}
    </section>
  )
}

export default CardDetails
