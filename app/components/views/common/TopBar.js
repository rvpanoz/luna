import React from 'react';
import cn from 'classnames';
import { oneOfType, objectOf, arrayOf, func, array, object, string } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

import { SearchBox } from 'components/views/common';

import styles from './styles/topBar';

const Topbar = ({ classes, theme, notifications }) => {

  return (
    <AppBar className={cn(classes.root)} position="fixed" elevation={0} color="inherit">
      <Toolbar disableGutters>
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
  theme: objectOf(oneOfType([string, object, array, func])).isRequired,
  notifications: arrayOf(object)
};

export default withStyles(styles, {
  withTheme: true
})(Topbar);
