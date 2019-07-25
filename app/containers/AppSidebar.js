import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import { AppLogo } from 'components/common/';
import { iMessage } from 'commons/utils';

import styles from './styles/appSidebar';

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

const AppSidebar = ({
  classes,
  mode,
  directory,
  fullDirectory,
  ...restProps
}) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);

  const {
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

  const installPackagesFromJson = () => {
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
        installPackage({
          ipcEvent: 'install',
          cmd: ['install'],
          packageJson: true,
          mode,
          directory: fullDirectory
        })
      );

    return showDialog(dialogHandler, dialogOptions);
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

  return (
    <>
      <Drawer variant="permanent" {...restProps}></Drawer>
    </>
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
