/* eslint-disable */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from './styles/settings';

const Settings = ({ classes, items }) => {
  const [menu, setMenu] = useState({
    open: false,
    anchorEl: null
  });

  const handleAction = () => ({});

  return (
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
            {item.action && (
              <ListItemSecondaryAction>
                <IconButton
                  aria-label={`${item.primaryText}-more`}
                  aria-owns={menu.open ? 'long-menu' : undefined}
                  aria-haspopup="true"
                  onClick={e =>
                    setMenu({
                      open: true,
                      anchorEl: e.currentTarget
                    })
                  }
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  disableAutoFocusItem
                  id="cache-menu"
                  anchorEl={menu.anchorEl}
                  open={menu.open}
                  onClose={() =>
                    setMenu({
                      open: false,
                      anchorEl: null
                    })
                  }
                  PaperProps={{
                    style: {
                      fontSize: 16,
                      maxHeight: 200,
                      width: 200
                    }
                  }}
                >
                  {['Verify', 'Clean'].map(option => (
                    <MenuItem key={option} onClick={() => handleAction(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </section>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(Settings);
