import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import { ipcRenderer, remote } from 'electron';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import PackagesIcon from '@material-ui/icons/ViewModuleRounded';
import ErrorIcon from '@material-ui/icons/WarningOutlined';

import { directoryParameters } from 'commons/parameters';
import InitForm from 'components/common/InitForm';

import SearchBox from 'components/common/SearchBox';
import { setActivePage } from 'models/ui/actions';

import System from './System';
import styles from './styles/appHeader';

const mapState = ({
  npm: { env },
  common: { onlineStatus },
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
  env
});

const Header = ({ classes, onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [initFlowDialog, setInitFlowDialog] = useState({
    open: false,
    directory: null
  });
  const { activePage, loading, env, status } = useMappedState(mapState);

  const dispatch = useDispatch();

  const startInitFlow = () =>
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      directoryParameters,
      filePath =>
        setInitFlowDialog({
          open: true,
          directory: filePath
        })
    );

  // TODO: implementation
  const npmInit = () => {};

  return (
    <section className={classes.root}>
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
              <Tooltip title="Create package.json">
                <div>
                  <Button
                    className={classes.button}
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={() => startInitFlow()}
                  >
                    Create
                  </Button>
                </div>
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
          <Tab
            textColor="inherit"
            label="Audit"
            value="audit"
            disabled={loading}
            icon={<SecurityIcon color="inherit" />}
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
      <Dialog
        open={initFlowDialog.open}
        maxWidth="md"
        onClose={() => setInitFlowDialog({ open: false, directory: null })}
        aria-labelledby="npm-init"
      >
        <DialogTitle>Create a package.json file</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Directory</Typography>
          <Typography variant="caption">{initFlowDialog.directory}</Typography>
          <InitForm
            onClose={() => setInitFlowDialog({ open: false, directory: null })}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
