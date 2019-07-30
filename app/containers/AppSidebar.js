import React from 'react';
import cn from 'classnames';
import { objectOf, string } from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { ipcRenderer } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Sidebar } from 'components/views/common';
import { setActivePage } from 'models/ui/actions';
import { setMode } from 'models/common/actions';

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

  const {
    mode,
    lastUpdatedAt,
    loading,
    packagesData,
    packagesOutdated
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
    }
  ];

  const dispatch = useDispatch();
  const loadDirectory = directory => {
    dispatch(setActivePage({ page: 'packages', paused: false }));
    dispatch(
      setMode({
        mode: 'local',
        directory
      })
    );
  };

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
