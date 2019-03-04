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
import { switchcase } from 'commons/utils';

import styles from './styles/appLayout';

const drawerWidth = 240;

const mapState = ({
  common: {
    mode,
    directory,
    projectName,
    projectVersion,
    activePage,
    loader: { loading },
    snackbarOptions
  },
  repository: {
    metadata: { lastUpdatedAt }
  }
}) => ({
  lastUpdatedAt,
  activePage,
  directory,
  projectName,
  projectVersion,
  loading,
  mode,
  packages,
  snackbarOptions
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const { activePage, snackbarOptions } = useMappedState(mapState);
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
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator
              title="Packages"
              PaperProps={{ style: { width: drawerWidth } }}
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
