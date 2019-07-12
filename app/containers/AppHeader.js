import React from 'react';
import PropTypes from 'prop-types';

import { shell } from 'electron';
import { useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';

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
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import AddIcon from '@material-ui/icons/AddOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import PackagesIcon from '@material-ui/icons/ViewModuleRounded';
import ErrorIcon from '@material-ui/icons/WarningOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import DoctorIcon from '@material-ui/icons/BuildOutlined';

import { Init, SearchBox, System } from 'components/views/common';
import { iMessage } from 'commons/utils';
import { setActivePage } from 'models/ui/actions';

import styles from './styles/appHeader';

const GIT_URL = 'https://github.com/rvpanoz/luna';

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
  mode,
  directory,
  onlineStatus,
  activePage,
  loading,
  env
});

const openUrl = url => shell.openExternal(url);

const Header = ({ classes, onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [initFlowDialog, setInitFlowDialog] = useState({
    open: false
  });
  const { activePage, loading, env, status, mode, directory } = useMappedState(
    mapState
  );
  const dispatch = useDispatch();

  return (
    <section className={classes.root}>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={8} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open-drawer"
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
              <Typography
                className={classes.link}
                component="a"
                onClick={() => openUrl(GIT_URL)}
              >
                Github
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={iMessage('title', 'system')}>
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
              <Typography className={classes.workingDir}>
                {mode === 'local'
                  ? iMessage('info', 'workingDirectory')
                  : iMessage('info', 'showingGlobals')}
              </Typography>
              <Typography className={classes.directory} variant="subtitle2">
                {mode === 'local' ? directory : env.prefix}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={iMessage('title', 'create')}>
                <div>
                  <Button
                    disabled={loading}
                    className={classes.button}
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={() => setInitFlowDialog({ open: true })}
                  >
                    <AddIcon className={classes.leftIcon} />
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
          <Tab
            textColor="inherit"
            label="Doctor"
            value="doctor"
            disabled={loading}
            icon={<DoctorIcon color="inherit" />}
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
              primaryText: 'Audit level',
              secondaryText: env.auditLevel
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
        maxWidth="sm"
        onClose={() => setInitFlowDialog({ open: false })}
        aria-labelledby="npm-init"
      >
        <DialogTitle>Create a package.json file</DialogTitle>
        <DialogContent>
          <Init onClose={() => setInitFlowDialog({ open: false })} />
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
