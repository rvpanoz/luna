import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import PackagesIcon from '@material-ui/icons/ViewModuleRounded';
import ErrorIcon from '@material-ui/icons/WarningOutlined';
import ListIcon from '@material-ui/icons/ListOutlined';

import NpmInit from 'components/common/NpmInit';
import System from 'components/common/System';
import SearchBox from 'components/common/SearchBox';

import { setActivePage } from 'models/ui/actions';

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
    open: false
  });
  const { activePage, loading, env, status } = useMappedState(mapState);

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
                    onClick={() => setInitFlowDialog({ open: true })}
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
            label="Reports"
            value="reports"
            disabled={loading}
            icon={<ListIcon color="inherit" />}
            classes={{
              label: classes.tabLabel
            }}
          />
          <Tab
            textColor="inherit"
            label="Audit"
            value="audit"
            disabled={loading}
            icon={<ListIcon color="inherit" />}
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
        maxWidth="sm"
        onClose={() => setInitFlowDialog({ open: false })}
        aria-labelledby="npm-init"
      >
        <DialogTitle>Create a package.json file</DialogTitle>
        <DialogContent>
          <NpmInit
            directory={initFlowDialog.directory}
            onClose={() => setInitFlowDialog({ open: false })}
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
