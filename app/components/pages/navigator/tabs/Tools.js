/* eslint-disable */

import { remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';

import styles from './styles/tools';

const ToolsTab = ({ classes, items, nodata }) => (
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
              <IconButton
                aria-label="action"
                disabled={nodata}
                onClick={() =>
                  remote.dialog.showMessageBox(
                    remote.getCurrentWindow(),
                    {
                      title: 'Confirmation',
                      type: 'question',
                      message: `Would you like to run ${
                        item.primaryText
                      }? \nNote: It will take some time `,
                      buttons: ['Cancel', 'Run']
                    },
                    btnIdx => {
                      if (Boolean(btnIdx) === true) {
                        item.handler();
                      }
                    }
                  )
                }
              >
                <ArrowRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  </div>
);

ToolsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  nodata: PropTypes.bool
};

export default withStyles(styles)(ToolsTab);
