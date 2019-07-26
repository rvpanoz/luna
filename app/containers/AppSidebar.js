import React from 'react';
import { bool, objectOf, string } from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';

import { Sidebar } from 'components/views/common';
import { drawerWidth } from "styles/variables";

import styles from './styles/appSidebar';

const mapState = ({
  common: { mode, directory },
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
  mode,
  directory,
  loading,
  lastUpdatedAt,
  packagesData,
  packagesOutdated
});

const AppSidebar = ({
  classes
}) => {
  const [history, updateHistory] = useState([]);

  const {
    mode,
    directory,
    packagesData,
    packagesOutdated,
    lastUpdatedAt,
    loading
  } = useMappedState(mapState);

  const dispatch = useDispatch();
  const loadDirectory = directory => {
    dispatch(
      setActivePage({ page: 'packages', paused: false })
    );
    dispatch(
      setMode({
        mode: 'local',
        directory
      })
    );
  }

  useEffect(() => {
    ipcRenderer.on('loaded-packages-close', (event, directories) =>
      updateHistory(directories)
    );

    return () => ipcRenderer.removeAllListeners(['loaded-packages-close']);
  }, []);

  return (
    <Drawer PaperProps={{ style: { width: drawerWidth } }} variant="permanent" anchor="left" classes={{ paper: classes.drawer }}>
      <div className={classes.flexContainer}>
        <Sidebar mode={mode} loadDirectory={loadDirectory} history={history} loading={loading} updateAt={lastUpdatedAt} />
      </div>
    </Drawer>
  );
};

AppSidebar.propTypes = {
  classes: objectOf(string).isRequired,
  sidebarOpen: bool
};

export default withStyles(styles)(AppSidebar);
