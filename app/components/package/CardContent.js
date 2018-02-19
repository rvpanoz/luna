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
import Avatar from 'material-ui/Avatar'
import HomeIcon from 'material-ui-icons/Home'
import Assistant from 'material-ui-icons/Assistant'
import BugReport from 'material-ui-icons/BugReport'
import PermIdentity from 'material-ui-icons/PermIdentity'

import FolderIcon from 'material-ui-icons/Folder'
import PageviewIcon from 'material-ui-icons/Pageview'
import AssignmentIcon from 'material-ui-icons/Assignment'

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
      <List>
        <ListItem>
          <Avatar>
            <HomeIcon />
          </Avatar>
          <ListItemText primary="Home" secondary={active.homepage} />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <BugReport />
          </Avatar>
          <ListItemText primary="Issues" secondary={active.bugs.url} />
        </ListItem>
        <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <PermIdentity />
          </Avatar>
          <ListItemText primary="Licence" secondary={active.license} />
        </ListItem>
        <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <Assistant />
          </Avatar>
          <ListItemText primary="Author" secondary={active.author} />
        </ListItem>
      </List>
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  classes: object,
  active: object
}

export default CardContent
