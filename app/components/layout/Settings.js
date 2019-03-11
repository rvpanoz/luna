/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import styles from './styles/settings';

const Settings = ({ classes, items }) => (
  <section className={classes.root}>
    <List dense={true}>
      {items.map((item, idx) => (
        <ListItem key={`settings-item-${idx}`} className={classes.listItem}>
          <ListItemText
            primary={
              <Typography variant="subtitle2">{item.primaryText}</Typography>
            }
            secondary={
              <Typography className={classes.secondaryText} variant="body2">
                {item.secondaryText}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  </section>
);

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(Settings);
