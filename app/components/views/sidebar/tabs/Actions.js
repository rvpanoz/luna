/* eslint-disable react/require-default-props */

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

const renderAction = (classes, nodata, mode, installPackages) => (
  <ListItem key="install_packagejson_all" className={classes.listItem}>
    <ListItemText
      primary={<Typography className={classes.label}>npm install</Typography>}
      secondary={
        <Typography className={classes.secondaryText}>
          Install from package.json
        </Typography>
      }
    />
    <ListItemSecondaryAction>
      <Tooltip
        title={
          mode === 'global'
            ? 'Not available in global mode'
            : 'Select package.json'
        }
      >
        <div>
          <IconButton
            aria-label="action_install"
            disabled={nodata || mode === 'global'}
            onClick={installPackages}
          >
            <ArrowRightIcon />
          </IconButton>
        </div>
      </Tooltip>
    </ListItemSecondaryAction>
  </ListItem>
);

const ActionsTab = ({ classes, items, nodata, mode, installPackages }) => (
  <div className={classes.tab}>
    <List dense>
      {renderAction(classes, nodata, mode, installPackages)}
      {items &&
        items.map(item => (
          <ListItem key={`action-${item.name}`} className={classes.listItem}>
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
              <Tooltip
                title={
                  mode === 'global'
                    ? 'Not available in global mode'
                    : `Execute ${item.primaryText}`
                }
              >
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
                          message: `\nWould you like to run ${
                            item.primaryText
                          }? \n\nNote: This process will take some time `,
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

ActionsTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.string,
  nodata: PropTypes.bool,
  installPackages: PropTypes.func.isRequired
};

export default withStyles(styles)(ActionsTab);
