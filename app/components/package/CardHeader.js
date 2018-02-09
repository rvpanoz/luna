import { CardHeader as MuiCardHeader } from 'material-ui/Card'
import React from 'react'
import PropTypes from 'prop-types'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'

const { object } = PropTypes

const CardHeader = (props) => {
  const { classes, active } = props

  function buildTitle() {
    const { name, author, version } = active
    return `${name} - v${version}`
  }

  if (!active) {
    return null
  }

  return (
    <MuiCardHeader
      avatar={
        <Avatar aria-label={active.name} className={classes.avatar}>
          {active.name[0].toUpperCase()}
        </Avatar>
      }
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title={buildTitle()}
      subheader={active.version}
    />
  )
}

CardHeader.propTypes = {
  classes: object,
  active: object
}

export default CardHeader
