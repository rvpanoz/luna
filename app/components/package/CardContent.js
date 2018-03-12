/**
 * CardContent component
 *
 */

import { CardContent as MuiCardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { APP_INFO, APP_MODES } from 'constants/AppConstants'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import CardOptions from './CardOptions'
import CardVersions from './CardVersions'
import CardInfo from './CardInfo'

const { object, array, func, string } = PropTypes

const CardContent = (props) => {
  const {
    classes,
    active,
    mode,
    version,
    cmdOptions,
    onChangeVersion,
    addCommandOption,
    removeCommandOption
  } = props

  if (!active) {
    return null
  }

  return (
    <MuiCardContent className={classes.cardContent}>
      <h3 className={classes.heading}>Description</h3>
      <Divider />
      <Typography component="div" className={classes.headingTail}>
        {active && active.description}
      </Typography>
      <h3 className={classes.heading}>Versions and options</h3>
      <Divider />
      <section className={classes.controls}>
        <CardVersions
          classes={classes}
          active={active}
          onChangeVersion={onChangeVersion}
        />
        {mode && mode === APP_MODES.LOCAL ? (
          <CardOptions
            cmdOptions={cmdOptions}
            addCommandOption={addCommandOption}
            removeCommandOption={removeCommandOption}
          />
        ) : null}
      </section>
      <h3 className={classes.heading}>Details and Dependencies</h3>
      <Divider />
      <Typography component="div">
        <CardInfo active={active} />
      </Typography>
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  version: string,
  cmdOptions: array,
  classes: object.isRequired,
  active: object.isRequired,
  onChangeVersion: func.isRequired,
  clearCommandOptions: func.isRequired
}

export default CardContent
