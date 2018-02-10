import { CardActions as MuiCardActions } from 'material-ui/Card'
import React from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import classnames from 'classnames'

const { object, func } = PropTypes

const CardActions = (props) => {
  const { classes, expanded, handleExpandClick } = props

  function handleChange(version) {
    return false
  }

  return (
    <MuiCardActions className={classes.actions}>
      <IconButton aria-label="Install">add</IconButton>
      <IconButton aria-label="Uninstall">delete</IconButton>
      <IconButton
        className={classnames(classes.expand, {
          [classes.expandOpen]: expanded
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </MuiCardActions>
  )
}

CardActions.propTypes = {
  classes: object,
  handleExpandClick: func.isRequired
}

export default CardActions
