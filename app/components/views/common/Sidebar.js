import React, { forwardRef } from 'react';
import cn from 'classnames';
import { string, objectOf } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors, ListItemText } from '@material-ui/core';

import styles from './styles/sidebar';

const Sidebar = ({ classes }) => {
  return <List>
    <ListItem>
      <ListItemText>_sidebar_</ListItemText>
    </ListItem>
  </List>
};

Sidebar.propTypes = {
  classes: objectOf(string).isRequired
};

export default withStyles(styles)(Sidebar);
