/**
 * AppHeader with mini drawer
 **/

import { ipcRenderer } from 'electron'
import {
  toggleLoader,
  toggleSettings,
  toggleDrawer,
  setOpenedPackages
} from 'actions/globalActions'
import {
  clearFilters,
  setActive,
  setPackageActions
} from 'actions/packagesActions'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Drawer from 'material-ui/Drawer'
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

const { object, func } = PropTypes

const styles = (theme) => {
  const drawerWidth = 275

  return {
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      color: theme.palette.white,
      backgroundColor: theme.palette.primary.main
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerInner: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      minHeight: 68
    },
    drawerPaperClose: {
      width: 60,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing.unit
    },
    modeIcon: {
      margin: theme.spacing.unit + 10
    },
    mode: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: theme.spacing.unit + 15
    },
    iconHover: {
      '&:hover': {
        fill: 'rgb(225, 0, 80)'
      }
    }
  }
}

class AppHeader extends React.Component {
  componentDidMount() {
    ipcRenderer.on('openedPackages_loaded', (event, packages) => {
      setOpenedPackages(packages)
    })
  }
  render() {
    const {
      menuOpen,
      classes,
      clearFilters,
      handleDrawerOpen,
      handleDrawerClose,
      mode,
      drawerOpen,
      directory,
      theme,
      setActive,
      toggleLoader,
      toggleSettings,
      toggleDrawer,
      setPackageActions,
      handleSettingsOpen,
      notifications,
      openedPackages
    } = this.props
    console.log(openedPackages)
    return (
      <div className="header">
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
                aria-label="open menu"
                onClick={handleDrawerOpen}
                style={{ color: '#fff' }}
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
              clearFilters={clearFilters}
            />
            <Notifications
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              toggleLoader={toggleLoader}
              notifications={notifications}
              mode={mode}
              directory={directory}
              setActive={setActive}
              setPackageActions={setPackageActions}
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
            <AppHeaderContent
              openedPackages={openedPackages}
              handleDrawerClose={handleDrawerClose}
              handleSettingsOpen={handleSettingsOpen}
            />
          </div>
        </Drawer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.global.drawerOpen,
    mode: state.global.mode,
    directory: state.global.directory,
    notifications: state.global.messages,
    openedPackages: state.global.openedPackages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setActive: (active) => dispatch(setActive(active)),
    setPackageActions: (actions) => dispatch(setPackageActions(actions)),
    setOpenedPackages: (packages) => dispatch(setOpenedPackages(packages)),
    toggleSettings: (bool) => dispatch(toggleSettings(bool)),
    toggleLoader: (bool) => dispatch(toggleLoader(bool)),
    toggleDrawer: (bool) => dispatch(toggleDrawer(bool)),
    clearFilters: () => dispatch(clearFilters())
  }
}

AppHeader.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired,
  handleDrawerOpen: func.isRequired,
  handleDrawerClose: func.isRequired,
  handleSettingsOpen: func.isRequired
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader)
