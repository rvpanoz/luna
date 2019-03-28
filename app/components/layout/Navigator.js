/* eslint-disable react/require-default-props */

import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'redux-react-hook';
import { ipcRenderer, remote } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/FolderOpen';

import AppLogo from 'components/layout/AppLogo';
import AppTabs from 'components/common/AppTabs';
import AppButton from 'components/units/Buttons/AppButton';
import { navigatorParameters } from 'commons/parameters';

import {
  ProjectTab,
  PackagesTab,
  ToolsTab
} from 'components/pages/navigator/tabs';
import { runTool } from 'models/packages/actions';
import { setMode } from 'models/ui/actions';

import styles from './styles/navigator';
import { Divider } from '@material-ui/core';

const Navigator = ({
  classes,
  mode,
  directory,
  fullDirectory,
  totalpackages,
  totaloutdated,
  totalnotifications,
  lastUpdatedAt,
  name,
  version,
  loading,
  userAgent,
  ...restProps
}) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) =>
      setOpenedDirectories(directories)
    );

    return () => ipcRenderer.removeAllListeners('loaded-packages-close');
  }, []);

  const runNpmTool = toolName => {
    const parameters = {
      ipcEvent: toolName,
      cmd: [toolName],
      mode,
      directory: fullDirectory
    };

    dispatch(
      runTool({
        channel: 'ipc-event',
        options: {
          ...parameters
        }
      })
    );
  };

  const openPackage = useCallback(() => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      navigatorParameters,
      filePath => {
        if (filePath) {
          dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
        }
      }
    );
  }, []);

  return (
    <Drawer variant="permanent" {...restProps}>
      <List disablePadding>
        <ListItem>
          <ListItemText>
            <AppLogo />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText className={classes.actionButton}>
            <AppButton
              style={{ fontSize: 20 }}
              disabled={loading}
              color="secondary"
              fullWidth
              round
              onClick={() => openPackage()}
              border
            >
              Analyze
            </AppButton>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Details
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText style={{ height: 315 }}>
            <AppTabs>
              <ProjectTab
                items={[
                  {
                    primaryText:
                      mode === 'local' && name
                        ? `${name} - v${version || '1.0.0'}`
                        : 'Global - v1.0.0',
                    secondaryText: `Last updated: ${lastUpdatedAt}`
                  },
                  {
                    primaryText:
                      mode === 'local' && directory && !loading
                        ? 'Working directory'
                        : null,
                    secondaryText:
                      mode === 'local' && directory && !loading
                        ? directory
                        : null
                  }
                ]}
                metadata={lastUpdatedAt}
                loading={loading}
              />
              <PackagesTab
                items={[
                  {
                    primaryText: 'Total',
                    secondaryText: totalpackages || 0,
                    color: 'secondary',
                    primary: true
                  },
                  {
                    primaryText: 'Outdated',
                    secondaryText: totaloutdated || 0,
                    color: 'warning',
                    warning: true
                  },
                  {
                    primaryText: 'Problems',
                    secondaryText: totalnotifications || 0,
                    color: 'error',
                    error: true
                  }
                ]}
                loading={loading}
              />
              <ToolsTab
                items={[
                  {
                    mode,
                    primaryText: 'npm audit',
                    secondaryText: 'Run npm audit',
                    handler: () => runNpmTool('audit')
                  },
                  {
                    mode,
                    primaryText: 'npm doctor',
                    secondaryText: 'Run npm doctor',
                    handler: () => runNpmTool('doctor')
                  },
                  {
                    mode,
                    primaryText: 'npm prune',
                    secondaryText: 'Remove extraneous packages',
                    handler: () => runNpmTool('prune')
                  },
                  {
                    mode,
                    primaryText: 'npm dedupe',
                    secondaryText:
                      'Searches the local package tree and attempts to simplify the overall structure',
                    handler: () => runNpmTool('dedupe')
                  }
                ]}
                nodata={totalpackages === 0}
                loading={loading}
              />
            </AppTabs>
          </ListItemText>
        </ListItem>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            History
          </ListItemText>
        </ListItem>

        {openedDirectories &&
          openedDirectories.map((dir, idx) => (
            <ListItem
              dense
              disabled={loading}
              button
              title={`load ${dir.name}`}
              onClick={() =>
                dispatch(setMode({ mode: 'local', directory: dir.directory }))
              }
              key={`directory-${idx + 1}`}
              className={classNames(classes.item)}
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
          ))}
      </List>
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
  totalnotifications: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalpackages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totaloutdated: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastUpdatedAt: PropTypes.string,
  fullDirectory: PropTypes.string,
  userAgent: PropTypes.string
};

export default withStyles(styles)(Navigator);
