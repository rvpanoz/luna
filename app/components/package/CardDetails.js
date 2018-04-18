/**
 * Card details component
 **/

import { withStyles } from 'material-ui/styles'
import { APP_INFO } from 'constants/AppConstants'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'

const grayColor = '#999999'
const styles = (theme) => {
  return {
    details: {
      marginBottom: 10
    },
    info: {
      lineHeight: '15px',
      color: grayColor,
      fontSize: '12px',
      display: 'inline-block',
      margin: '0!important'
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}

class CardDetails extends React.Component {
  constructor(props) {
    super()
  }
  render() {
    const { dist, classes } = this.props

    return (
      <div>
        <Typography
          className={classes.info}
          component="p"
          gutterBottom={true}
          variant="caption"
        >
          Shasum: {dist.shasum || APP_INFO.NOT_AVAILABLE}
        </Typography>
        <br />
        <Typography
          className={classes.info}
          component="p"
          gutterBottom={true}
          variant="caption"
        >
          Tarball:{' '}
          {dist.tarball ? (
            <a href="#" className={classes.link}>
              {dist.tarball}
            </a>
          ) : (
            APP_INFO.NOT_AVAILABLE
          )}
        </Typography>
        <br />
        <Typography
          className={classes.info}
          component="p"
          gutterBottom={true}
          variant="caption"
        >
          Integrity: {dist.integrity || APP_INFO.NOT_AVAILABLE}
        </Typography>
      </div>
    )
  }
}

CardDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardDetails)
