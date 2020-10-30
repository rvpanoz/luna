import React from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import { setActivePage } from 'models/ui/actions';
import { installPackageJson } from 'models/packages/actions';
import { setMode } from 'models/common/actions';
import { runDedupe, runCache } from 'models/npm/actions';
import { iMessage, shrinkDirectory, showDialog } from 'commons/utils';
import Sidebar from './Sidebar';
import CommandsLog from './CommandsLog';

import styles from './styles';

const mapState = ({
  common: { mode, directory, commandLog },
  packages: {
    project: projectInfo,
    packagesData,
    packagesOutdated,
    metadata: { lastUpdatedAt, fromSearch },
  },
  notifications: { notifications },
  ui: {
    loaders: {
      loader: { loading },
    },
  },
  npm: { env: npmEnv },
}) => ({
  fromSearch,
  mode,
  directory,
  loading,
  lastUpdatedAt,
  projectInfo,
  packagesData,
  packagesOutdated,
  notifications,
  npmEnv,
  commandLog,
});

const AppSidebar = ({ classes, className }) => {
  const [history, updateHistory] = useState([]);
  const dispatch = useDispatch();

  const {
    mode,
    directory,
    lastUpdatedAt,
    loading,
    projectInfo,
    packagesData,
    packagesOutdated,
    notifications,
    fromSearch,
    npmEnv,
    commandLog,
  } = useMappedState(mapState);

  const packagesItems = [
    {
      name: 'total-packages',
      primaryText: 'Total',
      secondaryText: packagesData ? packagesData.length : 0,
      color: 'secondary',
      primary: true,
    },
    {
      name: 'outdated-packages',
      primaryText: 'Outdated',
      secondaryText: packagesOutdated ? packagesOutdated.length : 0,
      color: 'warning',
      warning: true,
    },
    {
      name: 'notifications',
      primaryText: 'Problems',
      secondaryText: notifications ? notifications.length : 0,
      color: 'error',
      error: true,
    },
  ];

  const loadDirectory = useCallback(
    (directoryPath) => {
      dispatch(setActivePage({ page: 'packages', paused: false }));
      dispatch(
        setMode({
          mode: 'local',
          directory: directoryPath,
        })
      );
    },
    [dispatch]
  );

  const installPackagesFromJson = useCallback(() => {
    const shrinkedDirectory = directory && shrinkDirectory(directory);

    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', 'installAll', {
        '%directory%': directory,
      }),
      buttons: ['Cancel', 'Install'],
    };

    const dialogHandler = ({ response }) => {
      if (response === 0) {
        return;
      }

      dispatch(
        installPackageJson({
          ipcEvent: 'install',
          cmd: ['install'],
          packageJson: true,
          multiple: false,
          mode,
          directory: shrinkedDirectory,
        })
      );
    };

    return showDialog(dialogHandler, dialogOptions);
  }, [mode, directory, dispatch]);

  const dedupe = useCallback(() => {
    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', 'actionRun', {
        '%name%': 'npm dedupe',
      }),
      buttons: ['Cancel', 'Run'],
    };

    const dialogHandler = ({ response }) => {
      if (response === 0) {
        return;
      }

      dispatch(
        runDedupe({
          ipcEvent: 'dedupe',
          cmd: ['dedupe'],
        })
      );
    };

    return showDialog(dialogHandler, dialogOptions);
  }, [dispatch]);

  const cache = useCallback(() => {
    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', 'actionRun', {
        '%name%': 'npm cache verify',
      }),
      buttons: ['Cancel', 'Run'],
    };

    const dialogHandler = ({ response }) => {
      if (response === 0) {
        return;
      }

      dispatch(
        runCache({
          ipcEvent: 'cache',
          cmd: ['cache'],
          options: {
            action: 'verify',
          },
        })
      );
    };

    return showDialog(dialogHandler, dialogOptions);
  }, [dispatch]);

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) =>
      updateHistory(directories)
    );

    return () => ipcRenderer.removeAllListeners(['loaded-packages-close']);
  }, []);

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined,
      })}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawer }}
      >
        <Sidebar
          mode={mode}
          loadDirectory={loadDirectory}
          history={history}
          loading={loading}
          updatedAt={lastUpdatedAt}
          tabPackagesData={packagesItems}
          projectInfo={projectInfo}
          npmEnv={npmEnv}
          fromSearch={fromSearch}
          installPackagesFromJson={installPackagesFromJson}
          dedupe={dedupe}
          cache={cache}
        />
        <CommandsLog logs={commandLog} />
      </Drawer>
    </div>
  );
};

AppSidebar.propTypes = {
  classes: objectOf(string).isRequired,
  className: string,
};

export default withStyles(styles)(AppSidebar);
