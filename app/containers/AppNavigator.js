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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/FolderOpen';
import Button from '@material-ui/core/Button';
import AppLogo from 'components/common/AppLogo';
import AppTabs from 'components/common/AppTabs';
import { navigatorParameters } from 'commons/parameters';
import { DEFAULT_MODE, DEFAULT_VERSION } from 'constants/AppConstants';

import {
  ProjectTab,
  PackagesTab,
  ActionsTab
} from 'components/pages/navigator/tabs';
import { installPackages } from 'models/packages/actions';
import { setActivePage } from 'models/ui/actions';
import { setMode } from 'models/common/actions';
import { runAudit } from 'models/npm/actions';

import styles from './styles/navigator';

const mapState = ({
  notifications: { notifications },
  packages: {
    packagesData,
    packagesOutdated,
    metadata: { lastUpdatedAt }
  },
  ui: {
    loaders: {
      loader: { loading }
    }
  }
}) => ({
  loading,
  lastUpdatedAt,
  notifications,
  packagesData,
  packagesOutdated
});

const Navigator = ({
  classes,
  mode,
  directory,
  fullDirectory,
  lastUpdatedAt,
  name,
  version,
  loading,
  userAgent,
  ...restProps
}) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const { notifications, packagesData, packagesOutdated } = useMappedState(
    mapState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('history-close', (event, directories) =>
      setOpenedDirectories(directories)
    );

    return () => ipcRenderer.removeAllListeners(['history-close']);
  }, []);

  const openPackage = () =>
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
        message: `\nWould you like to install all the packages from \n${directory}? \n\nNote: This process will take some time `,
        buttons: ['Cancel', 'Install']
      },
      btnIdx => {
        if (Boolean(btnIdx) === true) {
          dispatch(installPackages(parameters));
        }
      }
    );
  };

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
            <Tooltip title="Open local directory">
              <Button
                disabled={loading}
                className={cn(classes.label, classes.margin)}
                color="secondary"
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => openPackage()}
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
          <ListItemText style={{ height: 250 }}>
            <AppTabs>
              <ProjectTab
                items={[
                  {
                    name: 'mode',
                    primaryText:
                      mode === 'local'
                        ? `${name} v${version || DEFAULT_VERSION}`
                        : DEFAULT_MODE,
                    secondaryText: `Last updated: ${lastUpdatedAt}`,
                    caption: true
                  },
                  {
                    name: 'directory',
                    caption: true,
                    primaryText:
                      mode === 'local' && directory
                        ? 'Working directory'
                        : null,
                    secondaryText:
                      mode === 'local' && directory ? directory : null
                  }
                ]}
                metadata={lastUpdatedAt}
                loading={loading}
              />
              <PackagesTab
                items={[
                  {
                    name: 'total-packages',
                    primaryText: 'Total',
                    secondaryText: (packagesData && packagesData.length) || 0,
                    color: 'secondary',
                    primary: true
                  },
                  {
                    name: 'outdated-packages',
                    primaryText: 'Outdated',
                    secondaryText:
                      (packagesOutdated && packagesOutdated.length) || 0,
                    color: 'warning',
                    warning: true
                  },
                  {
                    name: 'problems-packages',
                    primaryText: 'Problems',
                    secondaryText: (notifications && notifications.length) || 0,
                    color: 'error',
                    error: true
                  }
                ]}
                loading={loading}
              />
              <ActionsTab
                installPackages={installPackagesJson}
                mode={mode}
                items={[
                  {
                    name: 'audit',
                    mode,
                    primaryText: 'npm audit',
                    secondaryText: 'Scan project for vulnerabilities',
                    handler: () =>
                      dispatch(
                        runAudit({
                          channel: 'ipc-event',
                          ipcEvent: 'audit',
                          cmd: ['audit'],
                          mode,
                          directory: fullDirectory
                        })
                      )
                  }
                ]}
                nodata={packagesData && packagesData.length === 0}
                loading={loading}
              />
            </AppTabs>
          </ListItemText>
        </ListItem>
        <ListItem
          className={cn(classes.categoryHeader, classes.listItem)}
          key="history"
        >
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            History
          </ListItemText>
        </ListItem>
      </List>
      <div className={classes.listWrapper}>
        <List disablePadding>
          {openedDirectories &&
            openedDirectories.map((dir, idx) => (
              <Tooltip title={`Load ${dir.name}`} key={`directory-${idx + 1}`}>
                <ListItem
                  dense
                  disabled={loading}
                  button
                  onClick={() => {
                    dispatch(
                      setActivePage({ page: 'packages', paused: false })
                    );
                    dispatch(
                      setMode({ mode: 'local', directory: dir.directory })
                    );
                  }}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    <FolderIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense
                    }}
                    primary={dir.name}
                  />
                </ListItem>
              </Tooltip>
            ))}
        </List>
      </div>
    </Drawer>
  );
};

Navigator.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  version: PropTypes.string,
  description: PropTypes.string,
  directory: PropTypes.string,
  lastUpdatedAt: PropTypes.string,
  fullDirectory: PropTypes.string,
  userAgent: PropTypes.string
};

export default withStyles(styles)(Navigator);
