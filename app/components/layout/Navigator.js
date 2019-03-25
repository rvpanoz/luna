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

import {
  ProjectTab,
  PackagesTab,
  ToolsTab
} from 'components/pages/navigator/tabs';
import { runAudit } from 'models/packages/actions';
import { setMode } from 'models/ui/actions';

import styles from './styles/navigator';

const Navigator = ({
  classes,
  mode,
  directory,
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
  }, [openedDirectories]);

  const runNpmAuditHandler = () => {
    const parameters = {
      ipcEvent: 'ipc-event',
      cmd: ['audit']
    };

    dispatch(
      runAudit({
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
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'package.json',
            extensions: ['json']
          }
        ],
        properties: ['openFile']
      },
      filePath => {
        if (filePath) {
          dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
        }
      }
    );
  }, []);

  const handleDirectory = useCallback(dir => {
    dispatch(setMode({ mode: 'local', directory: dir }));
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
              disabled={loading}
              color="secondary"
              fullWidth
              onClick={() => openPackage()}
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
          <ListItemText style={{ height: 345 }}>
            <AppTabs>
              <ProjectTab
                items={[
                  {
                    primaryText:
                      mode === 'local' && name
                        ? `${name} - v${version || '1.0.0'}`
                        : 'Global - v1.0.0',
                    secondaryText: userAgent
                  },
                  {
                    primaryText:
                      mode === 'local' && directory && !loading
                        ? 'Home directory'
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
                    primaryText: 'npm audit',
                    secondaryText: 'Run npm audit',
                    handler: runNpmAuditHandler
                  },
                  {
                    primaryText: 'npm doctor',
                    secondaryText: 'Run npm doctor'
                  },
                  {
                    primaryText: 'npm prune',
                    secondaryText: 'Remove extraneous packages'
                  },
                  {
                    primaryText: 'lock verify',
                    secondaryText:
                      'Report if package.json is out of sync with package-lock.json'
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
              onClick={() => handleDirectory(dir.directory)}
              key={`directory-${idx + 1}`}
              className={classNames(classes.item)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense
                }}
              >
                {dir.name}
              </ListItemText>
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
  userAgent: PropTypes.string
};

export default withStyles(styles)(Navigator);
