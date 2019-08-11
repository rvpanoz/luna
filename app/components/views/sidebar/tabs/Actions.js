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
import { iMessage } from 'commons/utils';

import styles from './styles/actions';

const ActionsTab = ({ classes, mode, onInstallPackagesFromJson, onDedupe }) => <div className={classes.tab}>
  <List dense>
    <ListItem key="install-from-packagejson" className={classes.listItem}>
      <ListItemText
        primary={
          <Typography className={classes.label}>
            {iMessage('action', 'npmInstall')}
          </Typography>
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
              : iMessage('info', 'npmInstallInfo')
          }
        >
          <div>
            <IconButton
              aria-label="action-install"
              disabled={mode === 'global'}
              onClick={onInstallPackagesFromJson}
              disableRipple
            >
              <ArrowRightIcon color="primary" />
            </IconButton>
          </div>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem key="npm-dedupe" className={classes.listItem}>
      <ListItemText
        primary={
          <Typography className={classes.label}>
            {iMessage('action', 'npmDedupe')}
          </Typography>
        }
        secondary={
          <Typography className={classes.secondaryText}>
            {iMessage('info', 'npmDedupeInfo')}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <Tooltip
          title={
            mode === 'global'
              ? iMessage('info', 'notGlobalModeAvailable')
              : iMessage('info', 'npmInstallInfo')
          }
        >
          <div>
            <IconButton
              aria-label="action-dedupe"
              disabled={mode === 'global'}
              onClick={onDedupe}
              disableRipple
            >
              <ArrowRightIcon color="primary" />
            </IconButton>
          </div>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  </List>
</div>

ActionsTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onInstallPackagesFromJson: PropTypes.func.isRequired,
  onDedupe: PropTypes.func.isRequired,
  mode: PropTypes.string
};

export default withStyles(styles)(ActionsTab);
