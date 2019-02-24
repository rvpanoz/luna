import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';

import Navigator from 'components/layout/Navigator';
import Header from 'components/layout/AppHeader';
import SnackbarContent from 'components/common/SnackbarContent';
import { Packages } from 'components/pages/packages';
import { Notifications } from 'components/pages/notifications';

import { setSnackbar } from 'models/ui/actions';
import { switchcase } from 'commons/utils';

import { lighten } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;

const styles = appTheme => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    },
    [theme.breakpoints.up('sm')]: {
      width: 0
    }
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  mainContent: {
    flex: 1,
    padding: appTheme.spacing.unit * 2,
    background: lighten('#eaeff1', 0.1),
    overflow: 'hidden'
  }
});

const mapState = ({
  common: {
    mode,
    projectName,
    projectVersion,
    activePage,
    loader: { loading },
    snackbarOptions
  }
}) => ({
  activePage,
  projectName,
  projectVersion,
  loading,
  mode,
  snackbarOptions
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const { activePage, snackbarOptions, loading, ...rest } = useMappedState(
    mapState
  );
  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smDown implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={drawerOpen}
              onClose={() => toggleDrawer(!drawerOpen)}
              {...rest}
            />
          </Hidden>
          <Hidden mdUp implementation="css">
            <Navigator PaperProps={{ style: { width: 0 } }} {...rest} />
          </Hidden>
        </nav>
        <div className={classes.appContent}>
          <Header onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            {switchcase({
              packages: () => <Packages too={false} />,
              problems: () => <Notifications />,
              scripts: () => <div>scripts</div>
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
