import React from 'react';
import { bool, objectOf, string } from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import { AppLogo } from 'components/common/';
import { iMessage } from 'commons/utils';

import styles from './styles/appSidebar';
import { Sidebar } from '../components/views/common';

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

  return (
    <Drawer variant="permanent" anchor="left" classes={{ paper: classes.drawer }}>
      <div className={classes.flexContainer}>
        <AppLogo />
        <Sidebar />
      </div>
    </Drawer>
  );
};

AppSidebar.propTypes = {
  classes: objectOf(string).isRequired,
  sidebarOpen: bool
};

export default withStyles(styles)(AppSidebar);
