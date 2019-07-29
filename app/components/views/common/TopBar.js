import React from 'react';
import { objectOf, func, bool, arrayOf, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Tooltip,
  Badge,
  IconButton
} from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import ArchiveIcon from '@material-ui/icons/Archive';
import SecurityIcon from '@material-ui/icons/Security';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import { AppLogo, SearchBox } from 'components/common';
import { iMessage } from 'commons/utils';
import styles from './styles/topBar';

const Topbar = ({
  classes,
  notifications,
  mode,
  loading,
  onLoadDirectory,
  onInitFlow,
  setActivePage
}) => (
    <AppBar
      className={classes.root}
      position="fixed"
      elevation={0}
      color="inherit"
    >
      <Toolbar disableGutters>
        <div className={classes.flexGrow} />
        <div>
          <Toolbar
            disableGutters
            classes={{
              root: classes.toolbar
            }}
          >
            <Tooltip title={iMessage('title', 'loadDirectory')}>
              <div>
                <IconButton
                  classes={{
                    root: classes.button
                  }}
                  disableRipple
                  disabled={loading}
                  onClick={onLoadDirectory}
                  color="inherit"
                >
                  <ArchiveIcon className={classes.icon} />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={iMessage('title', 'createPackageJson')}>
              <div>
                <IconButton
                  classes={{
                    root: classes.button
                  }}
                  disableRipple
                  color="inherit"
                  disabled={loading}
                  onClick={onInitFlow}
                >
                  <AddIcon className={classes.icon} />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={iMessage('info', 'npmAuditInfo')}>
              <div>
                <IconButton
                  classes={{
                    root: classes.button
                  }}
                  color="inherit"
                  disableRipple
                  onClick={() => setActivePage('audit')}
                  disabled={loading || mode === 'global'}
                >
                  <SecurityIcon className={classes.icon} />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={iMessage('info', 'npmDoctorInfo')}>
              <div>
                <IconButton
                  color="inherit"
                  classes={{
                    root: classes.button
                  }}
                  disableRipple
                  disabled={loading}
                  onClick={() => setActivePage('doctor')}
                >
                  <LocalHospitalIcon className={classes.icon} />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={iMessage('title', 'notifications')}>
              <div>
                <IconButton
                  color="inherit"
                  classes={{
                    root: classes.button
                  }}
                  disableRipple
                  disabled={loading}
                  onClick={() => setActivePage('notifications')}
                >
                  <Badge
                    badgeContent={notifications ? notifications.length : 0}
                    showZero
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            </Tooltip>
          </Toolbar>
        </div>
        <div className={classes.flexGrow} />
        <SearchBox />
        <IconButton className={classes.button} color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

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
