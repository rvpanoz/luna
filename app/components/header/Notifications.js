/**
 * Notifications indicator
 *
 **/

import { triggerEvent } from 'utils'
import { withStyles } from 'material-ui/styles'
import { notificationsStyles } from 'styles/headerStyles'
import { APP_INFO } from 'constants/AppConstants'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { autoBind } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui-icons/Notifications'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'

const NotificationsList = (props) => {
  const {
    notifications,
    mode,
    directory,
    setActive,
    toggleLoader,
    setPackageActions
  } = props
  const totalNotifications = notifications && notifications.length

  return (
    <List style={{ width: '350px' }}>
      {totalNotifications > 0 ? (
        notifications.map((n, idx) => {
          const requires = n.requires || null
          const requiredBy = n.requiredBy || null

          return (
            <ListItem key={idx}>
              <ListItemText
                primary={n.body}
                secondary={
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      if (requires && typeof requires === 'string') {
                        const indexOfAt = requires.indexOf('@')
                        if (indexOfAt > -1) {
                          const pkgName = requires.substr(0, indexOfAt)
                          toggleLoader(true)
                          setActive(null)
                          setPackageActions([
                            {
                              text: 'Install',
                              iconCls: 'add',
                              color: 'secondary'
                            }
                          ])
                          triggerEvent('search-packages', {
                            cmd: ['search'],
                            pkgName,
                            mode,
                            directory
                          })
                        }
                      }
                    }}
                  >
                    Fix
                  </Button>
                }
              />
            </ListItem>
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

class Notifications extends React.Component {
  constructor(props) {
    super(props)
    autoBind(['onClick', 'onUpdateAll'], this)
    this.onClick = this.onClick.bind(this)
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
      toggleLoader,
      notifications,
      setPackageActions,
      setActive,
      classes,
      mode,
      directory
    } = this.props

    return (
      <div className={classes.root}>
        <IconButton onClick={this.onClick}>
          <Badge
            badgeContent={notifications.length}
            color="primary"
            className={classes.margin}
          >
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
            <NotificationsList
              notifications={notifications}
              mode={mode}
              directory={directory}
              setActive={setActive}
              toggleLoader={toggleLoader}
              setPackageActions={setPackageActions}
            />
          </div>
        </Drawer>
      </div>
    )
  }
}

const { array, bool, object, func, number } = PropTypes

Notifications.propTypes = {
  drawerOpen: bool.isRequired,
  toggleDrawer: func.isRequired,
  classes: object.isRequired,
  notificationsTotal: number
}

export default withStyles(notificationsStyles)(Notifications)
