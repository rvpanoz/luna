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
    <List dense>
      {items &&
        items.map(item => (
          <ListItem key={`packages-${item.name}`} className={classes.listItem}>
            <ListItemText
              primary={
                <div className={classes.containerHolder}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    variant="subtitle1"
                  >
                    {item.primaryText}
                  </Typography>
                </div>
              }
            />
            <ListItemSecondaryAction>
              <Typography
                className={classes.stats}
                color="textSecondary"
                variant="subtitle1"
              >
                {item.secondaryText}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  </div>
);

PackagesTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(PackagesTab);
