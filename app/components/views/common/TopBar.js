import React from 'react';
import { objectOf, func, bool, arrayOf, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Tooltip, Badge, Hidden, IconButton } from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/AddOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import LocalHospitalIcon from '@material-ui/icons/LocalHospitalOutlined';

import { AppLogo, SearchBox } from 'components/common'
import { iMessage } from 'commons/utils';

import styles from './styles/topBar';

const actionBarStyles = () => ({
  toolbar: {
    flexGrow: 1,
    alignItems: 'center',
  },
  button: {
    margin: '0 15px 0 0'
  },
  icon: {
    margin: 0
  }
})

const Topbar = ({ classes, notifications, mode, loading, onLoadDirectory, onInitFlow, setActivePage }) => (
  <AppBar className={classes.root} position="fixed" elevation={0} color="inherit">
    <Toolbar disableGutters>
      <AppLogo className={classes.logo} />
      <div>
        <Toolbar disableGutters classes={{
          root: classes.toolbar
        }}>
          <Tooltip title={iMessage('info', 'loadDirectory')}>
            <div>
              <IconButton
                classes={{
                  root: classes.button
                }}
                disableRipple
                disabled={loading}
                onClick={onLoadDirectory}
              >
                <ArchiveIcon className={classes.icon} />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('info', 'loadDirectory')}>
            <div>
              <IconButton
                classes={{
                  root: classes.button
                }}
                disableRipple
                disabled={loading}
                onClick={onInitFlow}
              >
                <AddIcon className={classes.icon} />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('info', 'loadDirectory')}>
            <div>
              <IconButton
                classes={{
                  root: classes.button
                }}
                disableRipple
                onClick={() => setActivePage('audit')}
                disabled={loading || mode === 'global'}
              >
                <SecurityIcon className={classes.icon} />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={iMessage('info', 'loadDirectory')}>
            <div>
              <IconButton
                classes={{
                  root: classes.button
                }}
                disableRipple
                disabled={loading}
              >
                <LocalHospitalIcon className={classes.icon} />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      </div>
      <div className={classes.flexGrow} />
      <SearchBox />
      <Hidden mdDown>
        <IconButton color="inherit">
          <Badge
            badgeContent={notifications ? notifications.length : 0}
            showZero
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          className={classes.button}
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>)

Topbar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  loading: bool,
  notifications: arrayOf(object),
  onLoadDirectory: func,
  setActivePage: func,
  onInitFlow: func
};

export default withStyles(styles)(Topbar);
