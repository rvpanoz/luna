/**
 * Notifications indicator
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
import CodeIcon from 'material-ui-icons/Code'
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
                    color="secondary"
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
    autoBind(['handleDrawer', 'onUpdateAll'], this)
  }
  handleDrawer(e) {
    const { toggleDrawer, drawerOpen } = this.props
    toggleDrawer(!drawerOpen)
  }
  handleCommands(e) {
    console.log(e)
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
        <IconButton onClick={this.handleCommands}>
          <CodeIcon className={classes.margin} style={{ color: '#fff' }} />
        </IconButton>
        <IconButton onClick={this.handleDrawer}>
          <Badge
            badgeContent={notifications.length}
            className={classes.margin}
            style={{ color: '#fff' }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={this.handleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawer}
            onKeyDown={this.handleDrawer}
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
