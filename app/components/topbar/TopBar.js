import React from 'react';
import { objectOf, func, bool, arrayOf, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Tooltip, Badge, IconButton } from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import ArchiveIcon from '@material-ui/icons/Archive';
import SecurityIcon from '@material-ui/icons/Security';
import InfoIcon from '@material-ui/icons/Info';

import { iMessage } from 'commons/utils';
import SearchBox from './SearchBox';
import styles from './styles/topbar';

const ToolbarAction = (props) => {
  const { title, onClick, icon, classes, disabled = false } = props;

  return (
    <Tooltip title={title}>
      <div>
        <IconButton
          classes={{
            root: classes.button,
          }}
          disableRipple
          disabled={disabled}
          onClick={onClick}
          color="inherit"
        >
          {icon}
        </IconButton>
      </div>
    </Tooltip>
  );
};

ToolbarAction.props = {
  classes: objectOf(string).isRequired,
  icon: arrayOf(object),
  title: string.isRequired,
  disabled: bool,
  onClick: func,
};

const Topbar = ({
  classes,
  notifications,
  mode,
  loading,
  onLoadDirectory,
  onCreate,
  onShowSettings,
  onShowSystem,
  setActivePage,
}) => (
  <AppBar className={classes.topbar} elevation={0} position="static">
    <Toolbar disableGutters>
      <div className={classes.actions}>
        <Toolbar
          disableGutters
          classes={{
            root: classes.root,
          }}
        >
          <ToolbarAction
            classes={classes}
            title={iMessage('title', 'loadDirectory')}
            onClick={onLoadDirectory}
            icon={
              <ArchiveIcon
                className={classes.icon}
                shapeRendering="crispEdges"
              />
            }
            disabled={loading}
          />

          <ToolbarAction
            classes={classes}
            title={iMessage('title', 'createPackageJson')}
            onClick={onCreate}
            icon={<AddIcon className={classes.icon} />}
            disabled={loading}
          />

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
      <Tooltip title={iMessage('title', 'settings')}>
        <IconButton
          className={classes.button}
          color="inherit"
          onClick={onShowSettings}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={iMessage('title', 'system')}>
        <IconButton
          className={classes.button}
          color="inherit"
          onClick={onShowSystem}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
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
  onShowSystem: func,
};

export default withStyles(styles)(Topbar);
