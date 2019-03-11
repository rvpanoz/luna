import React, { useState } from 'react';
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
import Popover from '@material-ui/core/Popover';

import Settings from './Settings';
import SearchBox from 'components/common/SearchBox';
import { setActivePage } from 'models/ui/actions';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/appHeader';

const mapState = ({
  common: {
    activePage,
    loader: { loading },
    npm: { env }
  }
}) => ({
  activePage,
  loading,
  env
});

const Header = ({ classes, onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();
  const { activePage, loading, env } = useMappedState(mapState);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={8} alignItems="center">
            <Hidden smUp>
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
                <IconButton
                  color="inherit"
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
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
          <Tab textColor="inherit" label="Problems" value="problems" />
        </Tabs>
      </AppBar>
      <Popover
        id="settings-pop"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Settings
          items={[
            {
              primaryText: 'environment',
              secondaryText: env.userAgent
            },
            {
              primaryText: 'registry',
              secondaryText: env.metricsRegistry
            },
            {
              primaryText: 'cache',
              secondaryText: env.cache
            }
          ]}
          loading={loading}
        />
      </Popover>
    </React.Fragment>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
