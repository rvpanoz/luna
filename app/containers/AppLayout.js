import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMappedState } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

import Navigator from 'components/layout/Navigator';
import Header from 'components/layout/AppHeader';
import Dashboard from 'components/pages/Dashboard';
import theme from 'styles/theme';

import { Packages } from 'components/pages/packages';
import { switchcase } from 'commons/utils';

const drawerWidth = 240;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  mainContent: {
    flex: 1,
    padding: '28px 18px 0',
    background: '#eaeff1'
  }
};

const mapState = ({
  common: {
    activePage,
    loader: { loading }
  }
}) => ({
  activePage,
  loading
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const { activePage } = useMappedState(mapState);

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
              onClose={toggleDrawer}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.appContent}>
          <Header onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            <div className={classes.container}>
              {switchcase({
                overview: () => <Dashboard />,
                packages: () => <Packages />
              })('overview')(activePage)}
            </div>
          </main>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppLayout);
