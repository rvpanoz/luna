import React from 'react';
import { objectOf, string, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './styles';

const PackageDependencies = ({ classes, dependencies }) => (
  <Paper className={classes.paper}>
    <div className={classes.header}>
      <Typography>{`Dependencies (${dependencies.length})`}</Typography>
    </div>
    <Divider />
    <List dense style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 425 }}>
      {dependencies.map((item) => (
        <ListItem key={item.name} className={classes.listItem}>
          <ListItemText
            primary={<Typography variant="subtitle2">{item.name}</Typography>}
            secondary={
              <Typography variant="subtitle2">{item.version}</Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

PackageDependencies.propTypes = {
  classes: objectOf(string).isRequired,
  dependencies: arrayOf(objectOf(string)).isRequired,
};

export default withStyles(styles)(PackageDependencies);
