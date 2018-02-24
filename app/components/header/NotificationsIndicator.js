/**
 * Notifications indicator
 *
 **/

import { withStyles } from 'material-ui/styles'
import { notificationsStyles } from '../../styles/components'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui-icons/Notifications'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const sideList = (
  <div>
    <List>
      <ListItem>
        <ListItemText primary="test" secondary="test" />
      </ListItem>
    </List>
    <Divider />
  </div>
)

class NotificationsIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick(e) {
    const { toggleDrawer, drawerOpen } = this.props
    toggleDrawer(!drawerOpen)
  }
  render() {
    const { drawerOpen, toggleDrawer, notificationsTotal, classes } = this.props

    return (
      <div className={classes.root}>
        <IconButton onClick={this.onClick}>
          <Badge badgeContent={4} color="accent">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(notificationsStyles)(NotificationsIndicator)
