/**
AppHeader with mini drawer
**/

import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import { toggleLoader, toggleSettings } from 'actions/global_actions'
import { APP_MODES } from 'constants/AppConstants'
import Drawer from 'material-ui/Drawer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import classNames from 'classnames'
import Chip from 'material-ui/Chip'
import Icon from 'material-ui/Icon'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import AppHeaderContent from './AppHeaderContent'
import SearchBox from './SearchBox'
import { firstToUpper } from '../../utils'
import { appHeaderStyles } from '../styles'

const {
	object
} = PropTypes

class AppHeader extends React.Component {
  constructor() {
    super()
  }
  render() {
    const {
      menuOpen,
      classes,
      handleDrawerOpen,
      handleDrawerClose,
      mode,
      directory,
      theme,
      toggleLoader,
      toggleSettings
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
                color="inherit"
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
            <div className={classes.info}>
              <Icon className={classes.modeIcon}>
                {mode === APP_MODES.GLOBAL ? 'language' : 'home'}
              </Icon>
              <span className={classes.mode}>{firstToUpper(mode)}</span>
            </div>
            <SearchBox toggleLoader={toggleLoader} />
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
    mode: state.global.mode,
    directory: state.global.directory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSettings: (bool) => dispatch(toggleSettings(bool)),
    toggleLoader: (bool) => dispatch(toggleLoader(bool))
  }
}

AppHeader.propTypes = {
  classes: object.isRequired,
  theme: object.isRequired,
	menuOpen:
}

export default compose(
  withStyles(appHeaderStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader)
