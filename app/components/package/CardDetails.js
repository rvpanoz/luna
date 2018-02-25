/**
 * Card details content (expanded)
 **/

import { APP_INFO } from 'constants/AppConstants'
import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'

const CardDetails = (props) => {
  const { classes, keywords } = props

  return (
    <section className={classes.details}>
      <h3 className={classes.heading}>Keywords</h3>
      <Divider />
      <div className={classes.keywords}>
        {keywords
          ? keywords.map((keyword, idx) => {
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
