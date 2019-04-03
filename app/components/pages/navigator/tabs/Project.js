/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import AppLoader from 'components/common/AppLoader';
import styles from './styles/project';

const key = 'project-tab';

const ProjectTab = ({ classes, items, loading }) => (
  <div className={classes.tab} style={{ minHeight: 250 }}>
    <AppLoader loading={loading} relative>
      <List dense={true}>
        {items.map((item, idx) => (
          <ListItem key={`${key}item-${idx}`} className={classes.listItem}>
            <ListItemText
              primary={
                <Typography className={classes.label} component="p">
                  {item.primaryText}
                </Typography>
              }
              secondary={
                <Typography
                  className={classes.secondaryText}
                  variant={item.caption ? 'caption' : 'body2'}
                >
                  {item.secondaryText}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </AppLoader>
  </div>
);

ProjectTab.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(ProjectTab);
