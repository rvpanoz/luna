import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import ControlTypes from 'components/common/ControlTypes';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

const Flags = ({ classes, selected }) => {
  return (
    <List dense className={classes.root}>
      {selected.map(packageName => (
        <ListItem key={packageName}>
          <ListItemText primary={packageName} />
          <ListItemSecondaryAction>
            <ControlTypes />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(Flags);
