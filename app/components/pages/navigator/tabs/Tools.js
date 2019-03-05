import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';

import styles from './styles/tools';

const ToolsTab = ({ classes, items }) => (
  <div className={classes.tab}>
    <List dense={true}>
      {items &&
        items.map((item, idx) => (
          <ListItem key={`tooitem-${idx}`} className={classes.listItem}>
            <ListItemText
              primary={<Typography>{item.primaryText}</Typography>}
              secondary={item.secondaryText}
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="action">
                <ArrowRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  </div>
);

ToolsTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ToolsTab);
