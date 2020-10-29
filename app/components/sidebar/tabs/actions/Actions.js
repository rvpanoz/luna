import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import InstallIcon from '@material-ui/icons/ArchiveOutlined';
import Typography from '@material-ui/core/Typography';
import { iMessage } from 'commons/utils';

import styles from './styles';

const ActionsTab = ({ classes, mode, onInstallPackagesFromJson }) => (
  <>
    <div className={classes.header}>
      <Typography className={classes.title} color="textSecondary">
        {iMessage('title', 'actions')}
      </Typography>
      <Divider />
    </div>
    <div className={classes.content}>
      <List dense>
        <ListItem className={classes.listItem}>
          <ListItemText
            primary={
              <div className={classes.flexWrapper}>
                <InstallIcon />
                <Typography className={classes.label}>
                  {iMessage('action', 'npmInstall')}
                </Typography>
              </div>
            }
            secondary={
              <Typography className={classes.secondaryText}>
                {iMessage('info', 'npmInstallInfo')}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Tooltip
              title={
                mode === 'global'
                  ? iMessage('info', 'notGlobalModeAvailable')
                  : iMessage('info', 'npmInstallRun')
              }
            >
              <div>
                <IconButton
                  aria-label="action-install"
                  disabled={mode === 'global'}
                  onClick={onInstallPackagesFromJson}
                  disableRipple
                >
                  <ArrowRightIcon
                    color={mode === 'global' ? 'inherit' : 'primary'}
                  />
                </IconButton>
              </div>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  </>
);

ActionsTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onInstallPackagesFromJson: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default withStyles(styles)(ActionsTab);
