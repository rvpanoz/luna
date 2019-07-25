import React from 'react';
import PropTypes from 'prop-types';

import { shell } from 'electron';
import { useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

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
import AnalyzeIcon from '@material-ui/icons/ArchiveOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import PackagesIcon from '@material-ui/icons/ViewModuleRounded';
import ErrorIcon from '@material-ui/icons/WarningOutlined';
import SecurityIcon from '@material-ui/icons/SecurityOutlined';
import GithubIcon from '@material-ui/icons/Link';

import { navigatorParameters } from 'commons/parameters';
import { Init, SearchBox, Settings } from 'components/views/common';
import { iMessage, showDialog } from 'commons/utils';
import { setActivePage } from 'models/ui/actions';
import { setMode } from 'models/common/actions';

import styles from './styles/appHeader';

const GIT_URL = 'https://github.com/rvpanoz/luna';
const openUrl = url => shell.openExternal(GIT_URL);

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

const Header = ({ classes, onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [initFlowDialog, setInitFlowDialog] = useState({
    open: false
  });
  const { activePage, loading, env, status, mode, directory } = useMappedState(
    mapState
  );
  const dispatch = useDispatch();
  const settings = [
    {
      primaryText: iMessage('label', 'environment'),
      secondaryText: env.userAgent
    },
    {
      primaryText: iMessage('label', 'registry'),
      secondaryText: env.metricsRegistry
    },
    {
      primaryText: iMessage('label', 'auditLevel'),
      secondaryText: env.auditLevel
    },
    {
      primaryText: iMessage('label', 'cache'),
      secondaryText: env.cache
    }
  ];

  const loadDirectory = () => {
    const dialogHandler = filePath => {
      dispatch(
        setActivePage({
          page: 'packages',
          paused: false
        })
      );
      dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
    };

    return showDialog(dialogHandler, { mode: 'file', ...navigatorParameters });
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
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
              <Tooltip title={iMessage('title', 'github')}>
                <div>
                  <IconButton
                    disableRipple
                    color="inherit"
                    onClick={e => openUrl()}
                  >
                    <GithubIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={iMessage('title', 'settings')}>
                <div>
                  <IconButton
                    disableRipple
                    color="inherit"
                    onClick={e => setAnchorEl(e.currentTarget)}
                  >
                    <NotificationsIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={iMessage('title', 'settings')}>
                <div>
                  <IconButton
                    disableRipple
                    color="inherit"
                    onClick={e => setAnchorEl(e.currentTarget)}
                  >
                    <SettingsIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        classes={{
          root: classes.appBar
        }}
      >
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography color="inherit" variant="h2">
              {iMessage('title', 'dashboard')}
            </Typography>
            <Typography className={classes.workingDir}>
              {mode === 'local'
                ? iMessage('info', 'workingDirectory')
                : iMessage('info', 'showingGlobals')}
            </Typography>
            <Typography className={classes.directory}>
              {mode === 'local' ? directory : env.prefix}
            </Typography>
          </Grid>
          <Grid item>
            <Toolbar disableGutters>
              <Tooltip title={iMessage('title', 'analyze')}>
                <div>
                  <Button
                    disabled={loading}
                    className={cn(classes.button, classes.marRight)}
                    color="inherit"
                    variant="outlined"
                    size="small"
                    onClick={() => loadDirectory()}
                  >
                    <AnalyzeIcon className={classes.leftIcon} />
                    {iMessage('action', 'analyze')}
                  </Button>
                </div>
              </Tooltip>
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
                    {iMessage('action', 'create')}
                  </Button>
                </div>
              </Tooltip>
            </Toolbar>
          </Grid>
        </Grid>
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
        <Settings items={settings} loading={loading} />
      </Popover>
      <Dialog
        open={initFlowDialog.open}
        maxWidth="sm"
        onClose={() => setInitFlowDialog({ open: false })}
        aria-labelledby="npm-init"
      >
        <DialogTitle>{iMessage('title', 'createPackageJson')}</DialogTitle>
        <DialogContent>
          <Init onClose={() => setInitFlowDialog({ open: false })} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
