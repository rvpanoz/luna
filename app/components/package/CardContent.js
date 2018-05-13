/**
 * CardContent component
 */

import { CardContent as MuiCardContent } from 'material-ui/Card'
import { APP_INFO } from 'constants/AppConstants'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import Typography from 'material-ui/Typography'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import CardTabs from './CardTabs'

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
      margin: theme.spacing.unit + 4
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
      marginTop: theme.spacing.unit + 2,
      marginBottom: theme.spacing.unit + 2
    },
    infoDetails: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
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
      toggleMainLoader,
      removeCommandOption,
      showDetails
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
          variant="body1"
          className={classes.headingTail}
        >
          {active && active.description}
        </Typography>
        {showDetails ? (
          <div className={classes.details}>
            <Typography
              variant="subheading"
              component="h3"
              className={classes.heading}
            >
              Details and statistics
            </Typography>
            <Divider />
            <section className={classes.infoDetails}>
              <Typography
                className={classes.info}
                component="p"
                gutterBottom={true}
                variant="caption"
              >
                Author: {active.author || APP_INFO.NOT_AVAILABLE}
              </Typography>
              <br />
              <CardTabs active={active} toggleMainLoader={toggleMainLoader} />
            </section>
          </div>
        ) : null}
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
