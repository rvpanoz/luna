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
import CardGraph from './CardGraph'

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
    packageJSON,
    group,
    removeCommandOption
  } = props

  if (!active) {
    return null
  }

  return (
    <MuiCardContent className={classes.cardContent}>
      <Typography component="h3" className={classes.heading}>
        Description
      </Typography>
      <Divider />
      <Typography component="div" className={classes.headingTail}>
        {active && active.description}
      </Typography>
      <Typography component="h3" className={classes.heading}>
        Version and options
      </Typography>
      <Divider />
      <section className={classes.controls}>
        <CardVersions
          classes={classes}
          active={active}
          onChangeVersion={onChangeVersion}
        />
        {mode && mode === APP_MODES.LOCAL ? (
          <CardOptions
            active={active}
            addCommandOption={addCommandOption}
            group={group}
            cmdOptions={cmdOptions}
            packageJSON={packageJSON}
            removeCommandOption={removeCommandOption}
          />
        ) : null}
      </section>
      <br />
      <Typography component="h3" className={classes.heading}>
        Details and stats
      </Typography>
      <Divider />
      <section className={classes.details}>
        <Typography
          className={classes.info}
          component="p"
          gutterBottom={true}
          variant="caption"
        >
          Author: {active.author || APP_INFO.NOT_AVAILABLE}
        </Typography>
        <br />
        <CardGraph time={active.time} />
        <Typography
          align="left"
          className={classes.info}
          component="p"
          gutterBottom={true}
          variant="caption"
        >
          Homepage: {active.homepage || APP_INFO.NOT_AVAILABLE}
        </Typography>
        <br />
        <Typography
          align="left"
          gutterBottom={true}
          variant="caption"
          className={classes.info}
          component="p"
        >
          Issues:&nbsp;
          {(active.bugs && active.bugs.url) || APP_INFO.NOT_AVAILABLE}
        </Typography>
      </section>
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
