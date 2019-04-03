/* eslint-disable */

import { remote } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';

import styles from './styles/tools';

const ToolsTab = ({ classes, items, nodata, mode }) => (
  <div className={classes.tab}>
    <List dense={true}>
      {items &&
        items.map((item, idx) => (
          <ListItem key={`tooitem-${idx}`} className={classes.listItem}>
            <ListItemText
              primary={
                <Typography className={classes.label}>
                  {item.primaryText}
                </Typography>
              }
              secondary={
                <Typography className={classes.secondaryText}>
                  {item.secondaryText}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title={`Execute ${item.primaryText}`}>
                <div>
                  <IconButton
                    aria-label="action"
                    disabled={nodata || mode === 'global'}
                    onClick={() =>
                      remote.dialog.showMessageBox(
                        remote.getCurrentWindow(),
                        {
                          title: 'Confirmation',
                          type: 'question',
                          message: `Would you like to run ${
                            item.primaryText
                          }? \nNote: This process will take some time `,
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
                </div>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  </div>
);

ToolsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.string,
  nodata: PropTypes.bool
};

export default withStyles(styles)(ToolsTab);
