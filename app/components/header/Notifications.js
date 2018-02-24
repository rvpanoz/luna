/**
 * Notifications indicator
 *
 **/

import { withStyles } from 'material-ui/styles'
import { notificationsStyles } from '../../styles/components'
import { APP_INFO } from 'constants/AppConstants'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui-icons/Notifications'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

const NotificationsLIst = (props) => {
  const { notifications } = props
  const totalNotifications = notifications && notifications.length

  return (
    <List style={{ width: '350px' }}>
      {totalNotifications > 0 ? (
        notifications.map((notification, idx) => {
          return (
            <div key={idx}>
              <ListItem>
                <ListItemText
                  primary={notification.body}
                  secondary={notification.level}
                />
              </ListItem>
              <Divider />
            </div>
          )
        })
      ) : (
        <ListItem>
          <ListItemText primary={APP_INFO.NO_NOTIFICATIONS} />
        </ListItem>
      )}
    </List>
  )
}

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
    const {
      drawerOpen,
      toggleDrawer,
      notificationsTotal,
      notifications,
      classes
    } = this.props

    return (
      <div className={classes.root}>
        <IconButton onClick={this.onClick}>
          <Badge badgeContent={notifications.length} color="accent">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={this.onClick}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.onClick}
            onKeyDown={this.onClick}
          >
            <NotificationsLIst notifications={notifications} />
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(notificationsStyles)(NotificationsIndicator)
