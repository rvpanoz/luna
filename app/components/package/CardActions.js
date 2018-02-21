/**
 * CardActions component
 *
 */

import { CardActions as MuiCardActions } from 'material-ui/Card'
import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from 'material-ui-icons/Add'
import UpdateIcon from 'material-ui-icons/Update'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import classnames from 'classnames'
import Button from 'material-ui/Button'

const { object, func } = PropTypes

const CardActions = (props) => {
  const { classes, actions, expanded, handleExpandClick } = props

  const renderIcon = (iconCls) => {
    switch (iconCls) {
      case 'update':
        return <UpdateIcon />
        break
      case 'add':
        return <AddIcon />
      case 'trash':
        return <DeleteIcon />
      default:
        return null
    }
  }

  return (
    <MuiCardActions className={classes.actions}>
      {actions &&
        actions.map((action, idx) => {
          return (
            <Button
              key={idx}
              variant="fab"
              color={action.color}
              aria-label={action.text}
              className={classes.button}
            >
              {renderIcon(action.iconCls)}
              {action.text}
            </Button>
          )
        })}
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
