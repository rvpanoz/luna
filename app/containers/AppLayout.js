import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import theme from 'styles/theme';

import Navigator from 'components/layout/Navigator';
import Header from 'components/layout/AppHeader';
import SnackbarContent from 'components/common/SnackbarContent';
import { Packages } from 'components/pages/packages';

import { setSnackbar } from 'models/ui/actions';
import { switchcase, shrinkDirectory } from 'commons/utils';

import { drawerWidth } from 'styles/variables';
import styles from './styles/appLayout';

const mapState = ({
  common: {
    mode,
    directory,
    activePage,
    loader: { loading },
    npm: { env },
    snackbarOptions,
    notifications
  },
  modules: {
    data: { packages, packagesOutdated },
    metadata: { lastUpdatedAt },
    project: { name, version }
  }
}) => ({
  lastUpdatedAt,
  activePage,
  mode,
  directory,
  packages,
  packagesOutdated,
  name,
  version,
  loading,
  mode,
  packages,
  snackbarOptions
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const {
    activePage,
    snackbarOptions,
    mode,
    directory,
    notifications,
    packages,
    packagesOutdated,
    name,
    version,
    env,
    loading
  } = useMappedState(mapState);
  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={drawerOpen}
              onClose={() => toggleDrawer(!drawerOpen)}
              title="Packages"
              totalpackages={packages && packages.length}
              totaloutdated={packagesOutdated && packagesOutdated.length}
              totalnotifications={notifications && notifications.length}
              mode={mode}
              directory={mode === 'local' && shrinkDirectory(directory)}
              title="Packages"
              name={name}
              version={version}
              env={env}
              loading={loading}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator
              totalpackages={packages && packages.length}
              totaloutdated={packagesOutdated && packagesOutdated.length}
              totalnotifications={notifications && notifications.length}
              mode={mode}
              directory={mode === 'local' && shrinkDirectory(directory)}
              title="Packages"
              PaperProps={{ style: { width: drawerWidth } }}
              name={name}
              version={version}
              env={env}
              loading={loading}
            />
          </Hidden>
        </nav>
        <div className={classes.appContent}>
          <Header onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            {switchcase({
              packages: () => <Packages />,
              tools: () => <Typography>NOT AVAILABLE</Typography>
            })(<Packages />)(activePage)}
          </main>
        </div>
        {snackbarOptions && snackbarOptions.open && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={Boolean(snackbarOptions.open)}
            autoHideDuration={5000}
            onClose={() =>
              dispatch(
                setSnackbar({
                  open: false,
                  message: null
                })
              )
            }
          >
            <SnackbarContent
              variant={snackbarOptions.type}
              message={snackbarOptions.message}
              onClose={() =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null
                  })
                )
              }
            />
          </Snackbar>
        )}
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppLayout);
