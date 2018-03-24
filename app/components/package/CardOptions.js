import {
  APP_MODES,
  PACKAGE_GROUPS,
  COMMAND_OPTIONS
} from 'constants/AppConstants'
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
import { contains } from 'ramda'
import Checkbox from 'material-ui/Checkbox'
import React from 'react'
import PropTypes from 'prop-types'

class CardOptions extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const { packageJSON, group, active, addCommandOption } = this.props
    const { name } = active

    if (group && packageJSON && typeof packageJSON === 'object') {
      const pkgVersion = packageJSON[group][name]
      if (pkgVersion && pkgVersion[0] === '^') {
        addCommandOption('save-exact')
      }
    }
  }
  handleChange(e) {
    const opt = e.currentTarget.value
    const { addCommandOption } = this.props

    addCommandOption(opt)
  }
  render() {
    const { cmdOptions } = this.props

    return (
      <FormControl component="fieldset">
        <FormGroup row>
          {COMMAND_OPTIONS.map((option, idx) => {
            let opt = option.split('*')
            console.log(option, opt)
            return (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={cmdOptions && contains(opt[0], cmdOptions)}
                    onChange={this.handleChange}
                    value={opt[0]}
                  />
                }
                label={opt[0]}
              />
            )
          })}
        </FormGroup>
        <FormHelperText>command flags</FormHelperText>
      </FormControl>
    )
  }
}

const { array } = PropTypes

CardOptions.propTypes = {
  cmdOptions: array.isRequired
}

export default CardOptions
