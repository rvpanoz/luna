import { withStyles } from 'material-ui'
import { folderListStyles } from './styles'
import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Home from 'material-ui-icons/Home'
import BugReport from 'material-ui-icons/BugReport'

const { array } = PropTypes

const filterWithKeys = (pred, obj) =>
  R.pipe(R.toPairs, R.filter(R.apply(pred)), R.fromPairs)(obj)

const FolderList = (props) => {
  const { classes } = props
  const data = filterWithKeys((key, val) => key !== 'classes', props)

  return (
    <List className={classes.root}>
      {R.mapObjIndexed((value, key) => {
        return (
          <ListItem key={key}>
            <Avatar>
              {key === 'Home' && <Home />}
              {key === 'Issues' && <BugReport />}
            </Avatar>
            <ListItemText primary={key} secondary={value} />
          </ListItem>
        )
      })(data)}
    </List>
  )
}

// <List className={classes.list}>
//   {data.map((key, value) => {
//     console.log(key, value)
//     return (
//       <ListItem key={key}>
//         <Avatar>
//           {key === 'Home' && <Home />}
//           {key === 'Issues' && <BugReport />}
//         </Avatar>
//         <ListItemText primary={key} secondary={value} />
//       </ListItem>
//     )
//   })}
// </List>

export default withStyles(folderListStyles)(FolderList)
