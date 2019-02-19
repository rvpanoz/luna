import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ControlTypes from 'components/common/ControlTypes';
import ControlFlags from 'components/common/ControlFlags';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper
  }
});

const Flags = ({ classes, selected }) => {
  return (
    <React.Fragment>
      <ControlFlags />
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
    </React.Fragment>
  );
};

export default withStyles(styles)(Flags);
