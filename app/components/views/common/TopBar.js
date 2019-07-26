import React from 'react';
import { objectOf, arrayOf, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';

import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { AppLogo, SearchBox } from 'components/common'

import styles from './styles/topBar';

const Topbar = ({ classes, notifications, mode, directory, env }) => {
  console.log(mode, directory, env)

  return (
    <AppBar className={classes.root} position="fixed" elevation={0} color="inherit">
      <Toolbar disableGutters>
        <AppLogo className={classes.logo} />
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
  );
};

Topbar.propTypes = {
  classes: objectOf(string).isRequired,
  mode: string.isRequired,
  directory: string,
  env: objectOf(string),
  notifications: arrayOf(object)
};

export default withStyles(styles)(Topbar);
