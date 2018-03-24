/**
 * CardContent component
 *
 */

import { CardContent as MuiCardContent } from 'material-ui/Card'
import { APP_INFO, APP_MODES } from 'constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import CardOptions from './CardOptions'
import CardVersions from './CardVersions'
import CardGraph from './CardGraph'

const { object, array, func, string } = PropTypes
const styles = (theme) => {
  return {
    heading: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '1.1rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    headingTail: {
      margin: '0.9em 0 2em'
    },
    controls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: theme.spacing.unit,
      '& fieldset': {
        margin: theme.spacing.unit
      }
    },
    details: {
      marginBottom: 10
    }
  }
}

class CardContent extends React.Component {
  render() {
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
      <MuiCardContent>
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
          <CardGraph active={active} />
        </section>
      </MuiCardContent>
    )
  }
}

CardContent.propTypes = {
  version: string,
  cmdOptions: array,
  classes: object.isRequired,
  active: object.isRequired,
  onChangeVersion: func.isRequired,
  clearCommandOptions: func.isRequired
}

export default withStyles(styles)(CardContent)
