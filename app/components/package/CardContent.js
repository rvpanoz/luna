/**
 * CardContent component
 *
 */

import { CardContent as MuiCardContent } from 'material-ui/Card'
import List, { ListItem, ListItemText } from 'material-ui/List'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Chip from 'material-ui/Chip'
import DoneIcon from 'material-ui-icons/Done'

const { object } = PropTypes

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const CardContent = (props) => {
  const {
    classes,
    active,
    mode,
    handleChange,
    tabIndex,
    buildLink,
    version,
    cmdOptions,
    onChangeVersion,
    addCommandOption,
    clearCommandOptions
  } = props

  if (!active) {
    return null
  }

  return (
    <MuiCardContent className={classes.cardContent}>
      <h3 className={classes.heading}>Description</h3>
      <Divider />
      <Typography className={classes.headingTail}>
        {active.description}
      </Typography>
      <h3 className={classes.heading}>Dist tags</h3>
      <Divider />
      <div className={classes.controls}>
        <Chip
          label={`latest: ${active['dist-tags'] && active['dist-tags'].latest}`}
          className={classes.chip}
        />
        <Chip
          label={`stable: ${active['dist-tags'] && active['dist-tags'].stable}`}
          className={classes.chip}
        />
      </div>
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  classes: object,
  active: object
}

export default CardContent
