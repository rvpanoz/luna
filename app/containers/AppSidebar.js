/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import AppLogo from 'components/common/AppLogo';
import AppTabs from 'components/common/AppTabs';

import UpdateIcon from '@material-ui/icons/Update';

import {
  PackagesTab,
  ActionsTab,
  HistoryTab
} from 'components/views/sidebar/tabs';

import { navigatorParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';
import { installPackage } from 'models/packages/actions';
import { setActivePage } from 'models/ui/actions';
import { setMode } from 'models/common/actions';
import { runAudit, runDoctor } from 'models/npm/actions';

import styles from './styles/appSidebar';

const mapState = ({
  notifications: { notifications },
  packages: {
    packagesData,
    packagesOutdated,
    metadata: { lastUpdatedAt }
  },
  ui: {
    activePage,
    loaders: {
      loader: { loading }
    }
  }
}) => ({
  activePage,
  loading,
  lastUpdatedAt,
  notifications,
  packagesData,
  packagesOutdated
});

const AppSidebar = ({
  classes,
  mode,
  directory,
  fullDirectory,
  ...restProps
}) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const {
    activePage,
    notifications,
    packagesData,
    packagesOutdated,
    lastUpdatedAt,
    loading
  } = useMappedState(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) =>
      setOpenedDirectories(directories)
    );

    return () => ipcRenderer.removeAllListeners(['loaded-packages-close']);
  }, []);

  const loadDirectory = () =>
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      navigatorParameters,
      filePath => {
        if (filePath) {
          dispatch(
            setActivePage({
              page: 'packages',
              paused: false
            })
          );
          dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
        }
      }
    );

  const installPackagesJson = () => {
    const parameters = {
      ipcEvent: 'install',
      cmd: ['install'],
      packageJson: true,
      mode,
      directory: fullDirectory
    };

    remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        title: 'Confirmation',
        type: 'question',
        message: iMessage('info', 'confirmNpmInstall', {
          '%directory%': directory
        }),
        buttons: ['Cancel', 'Install']
      },
      btnIdx => {
        if (btnIdx) {
          dispatch(installPackage(parameters));
        }
      }
    );
  };

  const packagesItems = [
    {
      name: 'total-packages',
      primaryText: 'Total',
      secondaryText: packagesData.length,
      color: 'secondary',
      primary: true
    },
    {
      name: 'outdated-packages',
      primaryText: 'Outdated',
      secondaryText: packagesOutdated.length,
      color: 'warning',
      warning: true
    },
    {
      name: 'problems-packages',
      primaryText: 'Problems',
      secondaryText: notifications ? notifications.length : 0,
      color: 'error',
      error: true
    }
  ];

  const actionItems = [
    {
      name: 'audit',
      mode,
      primaryText: 'npm audit',
      secondaryText: iMessage('info', 'npmAuditInfo'),
      handler: () => {
        dispatch(
          runAudit({
            ipcEvent: 'npm-audit',
            cmd: ['audit']
          })
        );
      }
    },
    {
      name: 'doctor',
      mode,
      primaryText: 'npm doctor',
      secondaryText: iMessage('info', 'npmDoctorInfo'),
      handler: () => {
        dispatch(
          runDoctor({
            ipcEvent: 'npm-doctor',
            cmd: ['doctor']
          })
        );
      }
    }
  ];

  return (
    <Drawer variant="permanent" {...restProps}>
      <List disablePadding>
        <ListItem className={classes.listItem} key="app-logo">
          <ListItemText>
            <AppLogo />
          </ListItemText>
        </ListItem>
        <ListItem className={classes.listItemHalfPadding} key="big-button">
          <ListItemText className={classes.actionButton}>
            <Tooltip title={iMessage('info', 'loadDirectory')}>
              <Button
                disabled={loading || activePage !== 'packages'} // to prevent bug with multiple fetching
                className={cn(classes.label, classes.margin)}
                color="secondary"
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => loadDirectory()}
              >
                Analyze
              </Button>
            </Tooltip>
          </ListItemText>
        </ListItem>
        <ListItem
          className={cn(classes.categoryHeader, classes.listItem)}
          key="app-tabs"
        >
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Details
          </ListItemText>
        </ListItem>
        <ListItem key="app-tabs-content" disableGutters>
          <ListItemText>
            <AppTabs>
              <Card className={classes.card}>
                <CardContent>
                  <Typography
                    className={classes.cardTitle}
                    color="textSecondary"
                  >
                    Overview
                  </Typography>
                  <Divider light />
                  <PackagesTab items={packagesItems} loading={loading} />
                </CardContent>
                <Divider light />
                <CardActions>
                  <div className={classes.cardFlexContainer}>
                    <UpdateIcon className={classes.updateIcon} />
                    <Typography variant="caption" className={classes.cardLabel}>
                      Updated at{' '}
                      {lastUpdatedAt !== null ? lastUpdatedAt : '...'}
                    </Typography>
                  </div>
                </CardActions>
              </Card>
              <ActionsTab
                installPackages={installPackagesJson}
                mode={mode}
                items={actionItems}
                nodata={packagesData.length}
                loading={loading}
              />
              <HistoryTab
                directories={openedDirectories || []}
                onClick={projectDirectory => {
                  dispatch(setActivePage({ page: 'packages', paused: false }));
                  dispatch(
                    setMode({
                      mode: 'local',
                      directory: projectDirectory
                    })
                  );
                }}
                loading={loading}
              />
            </AppTabs>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

AppSidebar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  version: PropTypes.string,
  description: PropTypes.string,
  directory: PropTypes.string,
  lastUpdatedAt: PropTypes.string,
  fullDirectory: PropTypes.string
};

export default withStyles(styles)(AppSidebar);
