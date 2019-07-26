import React from 'react';
import { objectOf, bool, arrayOf, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Tooltip, Badge, Hidden, IconButton } from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';

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

const ActionBar = ({ classes, loading, mode }) => <Toolbar classes={{
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
        disabled={loading || mode === 'global'}
      >
        <SecurityIcon className={classes.icon} />
      </IconButton>
    </div>
  </Tooltip>
</Toolbar>

ActionBar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  loading: bool,
}

const WithStylesActionBar = withStyles(actionBarStyles)(ActionBar)

const Topbar = ({ classes, notifications, mode, loading }) => <AppBar className={classes.root} position="fixed" elevation={0} color="inherit">
  <Toolbar disableGutters>
    <AppLogo className={classes.logo} />
    <WithStylesActionBar loading={loading} mode={mode} />
    <div className={classes.flexGrow} />
    <SearchBox />
    <Hidden mdDown>
      <IconButton color="inherit">
        <Badge
          badgeContent={notifications.length}
          color="primary"
          variant="dot"
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
</AppBar>

Topbar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  loading: bool,
  notifications: arrayOf(object)
};

export default withStyles(styles)(Topbar);
