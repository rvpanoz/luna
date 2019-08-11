import React from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Sidebar } from 'components/views/sidebar';
import { setActivePage } from 'models/ui/actions';
import { installPackageJson } from 'models/packages/actions'
import { setMode } from 'models/common/actions';
import { iMessage, shrinkDirectory, showDialog } from 'commons/utils'

import styles from './styles/appSidebar';

const mapState = ({
  common: { mode, directory },
  packages: {
    packagesData,
    packagesOutdated,
    metadata: { lastUpdatedAt }
  },
  notifications: {
    notifications
  },
  ui: {
    loaders: {
      loader: { loading }
    }
  }
}) => ({
  mode,
  directory,
  loading,
  lastUpdatedAt,
  packagesData,
  packagesOutdated,
  notifications
});

const AppSidebar = ({ classes, className }) => {
  const [history, updateHistory] = useState([]);
  const dispatch = useDispatch();

  const {
    mode,
    directory,
    lastUpdatedAt,
    loading,
    packagesData,
    packagesOutdated,
    notifications
  } = useMappedState(mapState);

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
      name: 'notifications',
      primaryText: 'Problems',
      secondaryText: notifications.length,
      color: 'error',
      error: true
    }
  ];

  const loadDirectory = useCallback(directoryPath => {
    dispatch(setActivePage({ page: 'packages', paused: false }));
    dispatch(
      setMode({
        mode: 'local',
        directory: directoryPath
      })
    );
  }, [dispatch]);

  const installPackagesFromJson = useCallback(() => {
    const shrinkedDirectory = directory && shrinkDirectory(directory);

    const dialogOptions = {
      title: 'Confirmation',
      type: 'question',
      message: iMessage('confirmation', 'installAll', {
        '%directory%': directory
      }),
      buttons: ['Cancel', 'Install']
    };

    const dialogHandler = () =>
      dispatch(
        installPackageJson({
          ipcEvent: 'install',
          cmd: ['install'],
          packageJson: true,
          multiple: false,
          mode,
          directory: shrinkedDirectory
        })
      );

    return showDialog(dialogHandler, dialogOptions);
  }, [mode, directory, dispatch]);

  // TODO: implementation
  const dedupe = useCallback(() => { }, []);

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) =>
      updateHistory(directories)
    );

    return () => ipcRenderer.removeAllListeners(['loaded-packages-close']);
  }, []);

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined
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
          installPackagesFromJson={installPackagesFromJson}
          dedupe={dedupe}
        />
      </Drawer>
    </div>
  );
};

AppSidebar.propTypes = {
  classes: objectOf(string).isRequired,
  className: string
};

export default withStyles(styles)(AppSidebar);
