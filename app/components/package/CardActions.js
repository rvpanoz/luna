/**
 * CardActions component
 *
 */

import { CardActions as MuiCardActions } from 'material-ui/Card'
import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import classnames from 'classnames'
import Button from 'material-ui/Button'

const { object, func } = PropTypes

const CardActions = (props) => {
  const { classes, expanded, handleExpandClick } = props

  return (
    <MuiCardActions className={classes.actions}>
      <Button
        variant="fab"
        color="accent"
        aria-label="add"
        className={classes.button}
      >
        <AddIcon />
        Install
      </Button>
      <Button
        variant="fab"
        aria-label="delete"
        color="primary"
        className={classes.button}
      >
        <DeleteIcon />
        Uninstall
      </Button>
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
