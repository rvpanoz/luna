/**
 *AppHeader with mini drawer
 *
 **/

import {
  toggleLoader,
  toggleSettings,
  toggleDrawer
} from 'actions/globalActions'
import { setActive, setPackageActions } from 'actions/packagesActions'
import { APP_MODES } from 'constants/AppConstants'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import classNames from 'classnames'
import Icon from 'material-ui/Icon'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import AppHeaderContent from './AppHeaderContent'
import SearchBox from './SearchBox'
import Notifications from './Notifications'
import { appHeaderStyles } from 'styles/components'

const { object } = PropTypes

class AppHeader extends React.Component {
  render() {
    const {
      menuOpen,
      classes,
      handleDrawerOpen,
      handleDrawerClose,
      mode,
      directory,
      theme,
      setActive,
      toggleLoader,
      toggleSettings,
      toggleDrawer,
      setPackageActions,
      drawerOpen,
      notifications
    } = this.props

    return (
      <section>
        <AppBar
          className={classNames(
            classes.appBar,
            menuOpen && classes.appBarShift
          )}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Toolbar disableGutters={!menuOpen}>
              <IconButton
                color="accent"
                aria-label="open menu"
                onClick={handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  menuOpen && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
            <SearchBox
              setActive={setActive}
              toggleLoader={toggleLoader}
              setPackageActions={setPackageActions}
            />
            <Notifications
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              notifications={notifications}
            />
          </div>
        </AppBar>
        <Drawer
          type="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !menuOpen && classes.drawerPaperClose
            )
          }}
          open={menuOpen}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <AppHeaderContent toggleSettings={toggleSettings} />
          </div>
        </Drawer>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.global.drawerOpen,
    mode: state.global.mode,
    directory: state.global.directory,
    notifications: state.global.messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActive: (active) => dispatch(setActive(active)),
    setPackageActions: (actions) => dispatch(setPackageActions(actions)),
    toggleSettings: (bool) => dispatch(toggleSettings(bool)),
    toggleLoader: (bool) => dispatch(toggleLoader(bool)),
    toggleDrawer: (bool) => dispatch(toggleDrawer(bool))
  }
}

AppHeader.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired
}

export default compose(
  withStyles(appHeaderStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader)
