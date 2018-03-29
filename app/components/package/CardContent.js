/**
 * CardContent component
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
import InfoIcon from 'material-ui-icons/Info'
import LinkIcon from 'material-ui-icons/Link'
import Grid from 'material-ui/Grid'
import BarGraph from 'components/package/BarGraph'
import LineGraph from 'components/package/LineGraph'

const grayColor = '#999999'
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
    },
    info: {
      lineHeight: '22px',
      color: grayColor,
      fontSize: '12px',
      display: 'inline-block',
      margin: '0!important'
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
    } = this.props

    if (!active) {
      return null
    }

    return (
      <MuiCardContent>
        <Typography component="h3" className={classes.heading}>
          Description
        </Typography>
        <Divider />
        <Typography
          component="div"
          variant="body2"
          className={classes.headingTail}
        >
          {active && active.description}
        </Typography>
        <br />
        <Typography
          variant="subheading"
          component="h3"
          className={classes.heading}
        >
          Details and stats
        </Typography>
        <Divider />
        <section className={classes.details}>
          <Typography
            className={classes.info}
            component="p"
            variant="body2"
            gutterBottom={true}
            variant="caption"
          >
            Author: {active.author || APP_INFO.NOT_AVAILABLE}
          </Typography>
          <br />
          <br />
          {active.stats ? <BarGraph active={active} /> : null}
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
