import { withStyles } from 'material-ui'
import { folderListStyles } from './styles'
import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Home from 'material-ui-icons/Home'
import BugReport from 'material-ui-icons/BugReport'
import Assistant from 'material-ui-icons/Assistant'

const { array, object } = PropTypes

const FolderList = (props) => {
  const { classes, data } = props

  return (
    <List className={classes.list}>
      {data.map((folderItem, key) => {
        return (
          <ListItem key={key}>
            <Avatar>
              {folderItem.prop === 'Home' && <Home />}
              {folderItem.prop === 'Issues' && <BugReport />}
              {folderItem.prop === 'Author' && <Assistant />}
            </Avatar>
            <ListItemText
              primary={folderItem.prop}
              secondary={folderItem.value}
            />
          </ListItem>
        )
      })}
    </List>
  )
}

FolderList.propTypes = {
  classes: object.isRequired,
  data: array.isRequired
}
export default withStyles(folderListStyles)(FolderList)
