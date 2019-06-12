import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/FolderOpen';

import styles from './styles/history';

const HistoryTab = ({ classes, directories, loading, onClick }) => (
  <div className={classes.tab}>
    <List>
      {!directories || !directories.length ? (
        <ListItem dense className={classes.listItem}>
          <ListItemText
            primary={
              <Typography className={classes.label}>No directories</Typography>
            }
          />
        </ListItem>
      ) : null}
      {directories.map((dir, idx) => (
        <Tooltip title={`Load ${dir.name}`} key={dir.name}>
          <ListItem dense className={classes.listItem}>
            <ListItemIcon>
              <FolderIcon color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.label}>{dir.name}</Typography>
              }
              secondary={
                <Typography className={classes.secondaryText}>
                  {path.dirname(dir.directory)}
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
                    <ArrowRightIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  </div>
);

HistoryTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  directories: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(HistoryTab);
