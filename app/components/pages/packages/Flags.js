import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ControlTypes from 'components/common/ControlTypes';
import ControlFlags from 'components/common/ControlFlags';

import styles from './styles/flags';

const Flags = ({ classes, selected }) => (
  <div className={classes.flexContainer}>
    <List dense className={classes.list}>
      {selected.map(packageName => (
        <ListItem key={packageName}>
          <ListItemText primary={packageName} />
          <ListItemSecondaryAction>
            <ControlTypes />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
    <ControlFlags />
  </div>
);

Flags.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Flags);
