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
import ArchiveIcon from '@material-ui/icons/Archive';

import AppLogo from 'components/layout/AppLogo';
import AppTabs from 'components/common/AppTabs';
import AppButton from 'components/units/Buttons/AppButton';

import {
  ProjectTab,
  PackagesTab,
  ToolsTab
} from 'components/pages/navigator/tabs';
import { setMode } from 'models/ui/actions';

import styles from './styles/navigator';

const runAudit = (mode, directory) =>
  ipcRenderer.send('ipc-event', {
    ipcEvent: 'npm-audit',
    cmd: ['audit'],
    mode,
    directory
  });

const Navigator = ({
  classes,
  mode,
  directory,
  totalpackages,
  totaloutdated,
  totalnotification,
  lastUpdatedAt,
  name,
  version,
  description,
  env,
  loading,
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

  const handleDirectory = useCallback(directory => {
    dispatch(setMode({ mode: 'local', directory }));
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
              color="primary"
              fullWidth
              onClick={() => openPackage()}
              style={{ fontSize: 18 }}
              variant="contained"
            >
              <ArchiveIcon className={classNames(classes.leftIcon)} />
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
          <ListItemText>
            <AppTabs>
              <ProjectTab
                items={[
                  {
                    primaryText: mode === 'local' && name ? name : null,
                    secondaryText:
                      mode === 'local' && description ? description : null
                  },
                  {
                    primaryText: mode === 'global' ? 'npm' : 'Home',
                    secondaryText: mode === 'global' ? env.userAgent : directory
                  },
                  {
                    primaryText: mode === 'global' ? 'registry' : null,
                    secondaryText:
                      mode === 'global' ? env.metricsRegistry : null
                  },
                  {
                    primaryText: mode === 'global' ? 'cache' : null,
                    secondaryText: mode === 'global' ? env.cache : null
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
                    secondaryText: totalnotification || 0,
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
                    secondaryText: 'Run npm audit'
                  },
                  {
                    primaryText: 'npm doctor',
                    secondaryText: 'Run npm doctor'
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
  projectName: PropTypes.string,
  projectVersion: PropTypes.string
};

export default withStyles(styles)(Navigator);
