/* eslint-disable */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';

import styles from './styles/notifications';

const Notifications = props => {
  const { classes, notifications } = props;

  return (
    <ClickAwayListener onClickAway={e => console.log(e)}>
      <Grow in={true} id="menu-list" style={{ transformOrigin: '0 0 0' }}>
        <Paper className={classes.dropdown}>
          <MenuList role="menu">
            {notifications &&
              notifications.map((notification, idx) => {
                const { body, requiredBy, requires } = notification;

                return (
                  <MenuItem
                    key={`notification-${idx}`}
                    onClick={e =>
                      console.log(`${body} ${requires}\n${requiredBy}`)
                    }
                    className={classes.dropdownItem}
                  >
                    {`${body} ${requires}\n${requiredBy}`}
                  </MenuItem>
                );
              })}
          </MenuList>
        </Paper>
      </Grow>
    </ClickAwayListener>
  );
};

export default withStyles(styles)(Notifications);
