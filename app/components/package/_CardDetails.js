/**
 * Card details content (expanded)
 **/

import { APP_INFO } from 'constants/AppConstants'
import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import CardInfo from './CardInfo'

const CardDetails = (props) => {
  const { classes, active } = props

  return (
    <section className={classes.details}>
      <Typography component="h3" className={classes.heading}>
        Details and dependencies
      </Typography>
      <Divider />
      <div className={classes.info}>
        <CardInfo active={active} classes={classes} />
      </div>
      <Typography component="h3" className={classes.heading}>
        Keywords
      </Typography>
      <Divider />
      <div className={classes.keywords}>
        {active && active.keywords
          ? active.keywords.map((keyword, idx) => {
              return <Chip key={idx} label={keyword} className={classes.chip} />
            })
          : APP_INFO.NOT_AVAILABLE}
      </div>
    </section>
  )
}

const { object, array } = PropTypes

CardDetails.propTypes = {
  classes: object.isRequired,
  keywords: array
}

export default CardDetails
