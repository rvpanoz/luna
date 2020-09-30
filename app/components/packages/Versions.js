import React from 'react';
import { objectOf, arrayOf, string, func } from 'prop-types';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { iMessage } from 'commons/utils';
import styles from './styles/versions';

const Versions = ({ classes, data, handleInstall }) => (
  <Paper className={classes.paper}>
    <div className={classes.header}>
      <Typography>{`Versions (${data.length})`}</Typography>
    </div>
    <Divider />
    <List dense style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 500 }}>
      {data.map((version) => (
        <ListItem key={version} className={classes.listItem}>
          <ListItemText
            primary={<Typography variant="subtitle2">{version}</Typography>}
          />
          <ListItemSecondaryAction>
            <Tooltip title={iMessage('title', 'installVersion')}>
              <div>
                <IconButton
                  aria-label="install-version"
                  onClick={() => handleInstall(version)}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Paper>
);

Versions.propTypes = {
  classes: objectOf(string).isRequired,
  handleInstall: func.isRequired,
  data: arrayOf(string).isRequired,
};

export default withStyles(styles)(Versions);
