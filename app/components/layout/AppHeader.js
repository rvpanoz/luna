import React from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import SearchBox from 'components/common/SearchBox';
import { setActivePage } from 'models/ui/actions';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/appHeader';

const mapState = ({
  common: {
    activePage,
    notifications,
    loader: { loading }
  }
}) => ({
  activePage,
  notifications,
  loading
});

const Header = ({ classes, onDrawerToggle }) => {
  const dispatch = useDispatch();
  const { activePage } = useMappedState(mapState);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={8} alignItems="center">
            <Hidden xsDown>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <SearchBox />
            </Grid>
            <Grid item>
              <Typography className={classes.link} component="a" href="#">
                Github
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="open settings">
                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={8}>
            <Grid item xs>
              <Typography color="inherit" variant="h5">
                Dashboard
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Install
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={activePage}
          textColor="inherit"
          onChange={(e, value) => dispatch(setActivePage(value))}
        >
          <Tab textColor="inherit" label="Packages" value="packages" />
          <Tab textColor="inherit" label="Problems" value="tools" />
          <Tab textColor="inherit" label="Scripts" value="scripts" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
