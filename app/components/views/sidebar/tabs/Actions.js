import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'redux-react-hook';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRightAlt';
import Typography from '@material-ui/core/Typography';

import { setActivePage } from 'models/ui/actions';
import { iMessage } from 'commons/utils';
import styles from './styles/actions';

const ActionsTab = ({ classes, mode, onClick }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.tab}>
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
                  : iMessage('title', 'selectPackageJson')
              }
            >
              <div>
                <IconButton
                  aria-label="action-doctor"
                  disabled={mode === 'global'}
                  onClick={onClick}
                >
                  <ArrowRightIcon />
                </IconButton>
              </div>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem key="npm-audit" className={classes.listItem}>
          <ListItemText
            primary={
              <Typography className={classes.label}>
                {iMessage('action', 'npmAudit')}
              </Typography>
            }
            secondary={
              <Typography className={classes.secondaryText}>
                {iMessage('info', 'npmAuditInfo')}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Tooltip title={iMessage('info', 'npmAuditInfo')}>
              <div>
                <IconButton
                  aria-label="action-audit"
                  onClick={() =>
                    dispatch(
                      setActivePage({
                        page: 'audit',
                        paused: true
                      })
                    )
                  }
                >
                  <ArrowRightIcon />
                </IconButton>
              </div>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem key="npm-doctor" className={classes.listItem}>
          <ListItemText
            primary={
              <Typography className={classes.label}>
                {iMessage('action', 'npmDoctor')}
              </Typography>
            }
            secondary={
              <Typography className={classes.secondaryText}>
                {iMessage('info', 'npmDoctorInfo')}
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Tooltip title={iMessage('info', 'npmDoctorInfo')}>
              <div>
                <IconButton
                  aria-label="action-doctor"
                  onClick={() =>
                    dispatch(
                      setActivePage({
                        page: 'doctor',
                        paused: true
                      })
                    )
                  }
                >
                  <ArrowRightIcon />
                </IconButton>
              </div>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

ActionsTab.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func,
  mode: PropTypes.string
};

export default withStyles(styles)(ActionsTab);
