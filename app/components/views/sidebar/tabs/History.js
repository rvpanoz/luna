/* eslint-disable react/require-default-props */

import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ArrowRightIcon from '@material-ui/icons/ArchiveOutlined';
import FolderIcon from '@material-ui/icons/FolderOpen';

import styles from './styles/history';

const HistoryTab = ({ classes, directories, onClick }) => (
  <div className={classes.tab}>
    <List>
      {!directories || !directories.length ? (
        <ListItem dense className={classes.listItem}>
          <ListItemText
            primary={
              <Typography className={classes.label}>No history</Typography>
            }
          />
        </ListItem>
      ) : null}
      {directories.map(dir => {
        const pathParts = path.parse(dir.directory);
        const directory = pathParts.dir
          .split('/')
          .slice(0, -1)
          .join('/');

        return (
          <ListItem dense className={classes.listItem} key={dir.name}>
            <ListItemIcon style={{ marginTop: 3 }}>
              <div>
                <Tooltip title={dir.directory}>
                  <FolderIcon color="secondary" />
                </Tooltip>
              </div>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.label}>{dir.name}</Typography>
              }
              secondary={
                <Typography variant="caption" className={classes.directory}>
                  {directory}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title="Load directory">
                <div>
                  <IconButton
                    aria-label="action"
                    onClick={() => onClick(dir.directory)}
                  >
                    <ArrowRightIcon color="primary" />
                  </IconButton>
                </div>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  </div>
);

HistoryTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  directories: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(HistoryTab);
