/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styles from './styles/packages';

const PackagesTab = ({ classes, items }) => (
  <div className={classes.tab}>
    <List dense={true}>
      {items &&
        items.map((item, idx) => (
          <ListItem key={`pjitem-${idx}`} className={classes.listItem}>
            <ListItemText
              primary={
                <Typography className={classes.title} component="p">
                  {item.primaryText}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography className={classes.stats} component="p">
                {item.secondaryText}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  </div>
);

PackagesTab.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(PackagesTab);
