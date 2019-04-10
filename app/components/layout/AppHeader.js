import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SystemIcon from '@material-ui/icons/InfoRounded';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import PackagesIcon from '@material-ui/icons/ViewModuleRounded';
import ErrorIcon from '@material-ui/icons/WarningOutlined';

import SearchBox from 'components/common/SearchBox';
import InstallFromSource from 'components/common/InstallFromSource';
import { setActivePage } from 'models/ui/actions';
import { installPackages } from 'models/packages/actions';

import System from './System';
import styles from './styles/appHeader';

const mapState = ({
  npm: { env },
  common: { onlineStatus, mode, directory },
  ui: {
    activePage,
    loaders: {
      loader: { loading }
    }
  }
}) => ({
  onlineStatus,
  activePage,
  loading,
  env,
  mode,
  directory
});

const Header = ({ classes, onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialog, setDialog] = useState({ open: false });
  const { activePage, loading, env, status, mode, directory } = useMappedState(
    mapState
  );

  const dispatch = useDispatch();

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
              <SearchBox onlineStatus={status} disabled={loading} />
            </Grid>
            <Grid item>
              <Typography className={classes.link} component="a" href="#">
                Github
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Preview system">
                <IconButton
                  disableRipple
                  color="inherit"
                  onClick={e => setAnchorEl(e.currentTarget)}
                >
                  <SystemIcon />
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
              <Tooltip title="Open install options">
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={() => setDialog({ open: true })}
                >
                  Install
                </Button>
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
        <Tabs
          value={activePage}
          indicatorColor="secondary"
          textColor="inherit"
          onChange={(e, value) =>
            dispatch(
              setActivePage({
                page: value,
                paused: true
              })
            )
          }
        >
          <Tab
            textColor="inherit"
            label="Packages"
            value="packages"
            classes={{
              label: classes.tabLabel
            }}
            icon={<PackagesIcon />}
          />
          <Tab
            textColor="inherit"
            label="Problems"
            value="problems"
            disabled={loading}
            icon={<ErrorIcon color="inherit" />}
            classes={{
              label: classes.tabLabel
            }}
          />
        </Tabs>
      </AppBar>
      <Popover
        id="system-pop"
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
        <System
          items={[
            {
              primaryText: 'Environment',
              secondaryText: env.userAgent
            },
            {
              primaryText: 'Registry',
              secondaryText: env.metricsRegistry
            },
            {
              primaryText: 'Cache',
              secondaryText: env.cache
            }
          ]}
          loading={loading}
        />
      </Popover>
      {dialog && dialog.open && (
        <Dialog open={dialog.open} aria-labelledby="install-from-source">
          <DialogContent>
            <InstallFromSource
              mode={mode}
              directory={directory}
              close={() =>
                setDialog({
                  open: false,
                  content: null
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setDialog({
                  open: false,
                  content: null
                })
              }
              color="secondary"
            >
              Close
            </Button>
            <Button
              color="primary"
              onClick={() => {
                const parameters = {
                  ipcEvent: 'install',
                  cmd: ['install'],
                  packageJson: true,
                  mode,
                  directory
                };

                dispatch(installPackages(parameters));
                setDialog({
                  open: false,
                  content: null
                });
              }}
            >
              Install
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
