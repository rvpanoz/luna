import { withStyles } from 'material-ui'
import { folderListStyles } from './styles'
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Home from 'material-ui-icons/Home'
import BugReport from 'material-ui-icons/BugReport'

const { array } = PropTypes

const FolderList = (props) => {
  const { classes, active } = props

  const data = [
    {
      text: 'Home',
      url: active.homepage
    },
    {
      text: 'Issues',
      url: active.bugs && active.bugs.url
    }
  ]

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {data.map((item, idx) => {
          return (
            <ListItem key={idx}>
              <Avatar>
                {item.text === 'Home' && <Home />}
                {item.text === 'Issues' && <BugReport />}
              </Avatar>
              <ListItemText primary={item.text} secondary={item.url} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default withStyles(folderListStyles)(FolderList)
