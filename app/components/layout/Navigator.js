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
import AddIcon from '@material-ui/icons/AddTwoTone';
import Button from '@material-ui/core/Button';
import AppLogo from 'components/layout/AppLogo';
import AppTabs from 'components/common/AppTabs';
import { navigatorParameters } from 'commons/parameters';

import {
  ProjectTab,
  PackagesTab,
  ToolsTab
} from 'components/pages/navigator/tabs';
import { runTool } from 'models/packages/actions';
import { setMode } from 'models/ui/actions';

import styles from './styles/navigator';

const mapState = ({
  common: { notifications },
  modules: {
    data: { packages, packagesOutdated }
  }
}) => ({
  notifications,
  packages,
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
  const { notifications, packages, packagesOutdated } = useMappedState(
    mapState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) =>
      setOpenedDirectories(directories)
    );

    return () => ipcRenderer.removeAllListeners('loaded-packages-close');
  }, []);

  const runNpmTool = (toolName, options) => {
    dispatch(
      runTool({
        channel: 'ipc-event',
        ipcEvent: toolName,
        cmd: [toolName],
        options,
        mode,
        directory: fullDirectory
      })
    );
  };

  const openPackage = () =>
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      navigatorParameters,
      filePath => {
        if (filePath) {
          dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
        }
      }
    );

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
                className={classes.margin}
                color="secondary"
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => openPackage()}
              >
                <AddIcon className={classes.extendedIcon} />
                <span className={classes.label}>Analyze</span>
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
                    primaryText: loading
                      ? 'loading..'
                      : mode === 'local' && name
                      ? `${name} v${version || '1.0.0'}`
                      : 'Global packages',
                    secondaryText: `Last updated: ${lastUpdatedAt}`,
                    caption: true
                  },
                  {
                    caption: true,
                    primaryText: loading
                      ? 'loading..'
                      : mode === 'local' && directory
                      ? 'Working directory'
                      : null,
                    secondaryText: loading
                      ? 'loading..'
                      : mode === 'local' && directory
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
                    secondaryText: (packages && packages.length) || 0,
                    color: 'secondary',
                    primary: true
                  },
                  {
                    primaryText: 'Outdated',
                    secondaryText:
                      (packagesOutdated && packagesOutdated.length) || 0,
                    color: 'warning',
                    warning: true
                  },
                  {
                    primaryText: 'Problems',
                    secondaryText: (notifications && notifications.length) || 0,
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
                  }
                ]}
                nodata={packages && packages.length === 0}
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
                  onClick={() =>
                    dispatch(
                      setMode({ mode: 'local', directory: dir.directory })
                    )
                  }
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
