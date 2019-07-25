import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';

import styles from './styles/sidebarNav';

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {views.map(page => (
        <ListItem className={classes.item} disableGutters key={view.title}>
          <Button activeClassName={classes.active} className={classes.button}>
            <div className={classes.icon}>{view.icon}</div>
            {view.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  views: PropTypes.array.isRequired
};

export default withStyles(styles)(SidebarNav);
