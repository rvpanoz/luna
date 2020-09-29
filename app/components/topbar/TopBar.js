import React from 'react';
import { objectOf, func, bool, arrayOf, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Tooltip, Badge, IconButton } from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActiveOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import LocalHospitalIcon from '@material-ui/icons/LocalHospitalOutlined';

import { SearchBox } from 'components/common';
import { iMessage } from 'commons/utils';
import styles from './styles';

const Topbar = ({
  classes,
  notifications,
  mode,
  loading,
  onLoadDirectory,
  onInitFlow,
  onShowSettings,
  setActivePage,
}) => (
  <AppBar
    className={classes.topbar}
    position="static"
    elevation={0}
    color="inherit"
  >
    <Toolbar disableGutters>
      <div className={classes.actions}>
        <Toolbar
          disableGutters
          classes={{
            root: classes.root,
          }}
        >
          <Tooltip title={iMessage('title', 'loadDirectory')}>
            <div>
              <IconButton
                classes={{
                  root: classes.button,
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
                  root: classes.button,
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
                  root: classes.button,
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
                  root: classes.button,
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
                  root: classes.button,
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
                  {notifications && notifications.length ? (
                    <NotificationsActiveIcon />
                  ) : (
                    <NotificationsIcon />
                  )}
                </Badge>
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      </div>
      <div className={classes.flexGrow} />
      <SearchBox />
      <IconButton
        className={classes.button}
        color="inherit"
        onClick={onShowSettings}
      >
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
  onInitFlow: func,
  onShowSettings: func,
};

export default withStyles(styles)(Topbar);
