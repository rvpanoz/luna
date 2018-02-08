import { shell } from 'electron'
import { withStyles } from 'material-ui'
import { folderListStyles } from './styles'
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Home from 'material-ui-icons/Home'
import BugReport from 'material-ui-icons/BugReport'
import Assistant from 'material-ui-icons/Assistant'
import Link from './Link'

const { array, object } = PropTypes

const FolderList = (props) => {
  const { classes, data } = props

  function doNavigate(e, url) {
    e.preventDefault()
    const url = e.target.dataset.url
    if (isUrl(url)) {
      shell.openExternal(url)
    }
    return false
  }

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
              secondary={<Link onClick={doNavigate} text="visit" />}
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
