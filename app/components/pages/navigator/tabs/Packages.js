import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ModulesIcon from '@material-ui/icons/LibraryAddOutlined';
import UpdateIcon from '@material-ui/icons/Update';
import ErrorIcon from '@material-ui/icons/ErrorOutlineSharp';
import Typography from '@material-ui/core/Typography';

import styles from './styles/packages';

const PackagesTab = ({ classes, items }) => (
  <div className={classes.tab}>
    <List dense={true}>
      {items &&
        items.map((item, idx) => (
          <ListItem key={`pjitem-${idx}`} className={classes.listItem}>
            <ListItemAvatar>
              <Avatar
                className={cn({
                  [classes[`${item.color}Color`]]: item.color
                })}
              >
                {item.primary && <ModulesIcon />}
                {item.warning && <UpdateIcon />}
                {item.error && <ErrorIcon />}
              </Avatar>
            </ListItemAvatar>
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
