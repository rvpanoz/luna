/* eslint-disable */
/* eslint-disable-interactive-support-focus */

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';
import { useDispatch, useMappedState } from 'redux-react-hook';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SearchBox from './SearchBox';
import styles from './styles/header';
import Settings from './Settings';
import Notifications from './Notifications';

import { APP_MODES } from 'constants/AppConstants';
import { setMode } from 'models/ui/actions';

const mapState = state => ({
  notifications: state.common.notifications,
  loading: state.packages.loading
});

const Header = props => {
  const { app, classes } = props;
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const [drawerOpen, toggleDrawer] = useState(false);
  const [settingsOpen, toggleSettings] = useState(false);
  const [keyboardOpen, toggleKeyboard] = useState(false);

  const dispatch = useDispatch();
  const { notifications, loading } = useMappedState(mapState);

  const menuOpen = Boolean(anchorEl);
  const notificationsOpen = Boolean(notifications.length && notificationsEl);

  useEffect(
    () => {
      ipcRenderer.on('loaded-packages-close', (event, directories) => {
        setOpenedDirectories(directories);
      });

      return () => ipcRenderer.removeAllListeners('loaded-packages-close');
    },
    [openedDirectories.length]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.headerToolbar}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open menu"
            onClick={e => toggleDrawer(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            {app}
          </Typography>
          <SearchBox disabled={loading} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              color="inherit"
              aria-owns={menuOpen ? 'app-settings' : undefined}
              aria-haspopup="true"
              onClick={e => {
                // setAnchorEl(e.currentTarget);
              }}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="app-settings"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={e => setAnchorEl(null)}
            >
              <MenuItem onClick={e => toggleSettings(true)}>Settings</MenuItem>
              <MenuItem onClick={e => toggleKeyboard(true)}>
                Keyboard shortcuts
              </MenuItem>
            </Menu>
            <IconButton
              color="inherit"
              onClick={e => {
                setNotificationsEl(e.currentTarget);
              }}
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              open={notificationsOpen}
              anchorEl={notificationsEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              onClose={e => setNotificationsEl(null)}
            >
              <Notifications notifications={notifications} />
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={e => toggleDrawer(!drawerOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.list}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Icon>folder_open</Icon>
              </ListItemIcon>
              <ListItemText primary="My History" />
            </ListItem>
            {openedDirectories &&
              openedDirectories.map((dir, idx) => (
                <ListItem
                  key={`directory-${idx}`}
                  dense={true}
                  style={{ marginLeft: '10px' }}
                >
                  <ListItemText
                    className={classes.listItem}
                    primary={
                      <a
                        onClick={() =>
                          dispatch(
                            setMode({
                              mode: APP_MODES.LOCAL,
                              directory: dir.directory
                            })
                          )
                        }
                        href="#sub-labels-and-columns"
                        className={classes.link}
                      >
                        {dir.name}
                      </a>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </div>
      </Drawer>
      <Modal
        aria-labelledby="settings"
        aria-describedby="settings"
        open={settingsOpen}
        onClose={e => setAnchorEl(null)}
      >
        <div className={classes.paper}>
          <Settings onClose={e => toggleSettings(false)} />
        </div>
      </Modal>
      <Modal
        aria-labelledby="keyboard"
        aria-describedby="keyboard"
        hideBackdrop
        open={keyboardOpen}
        onClose={e => toggleKeyboard(false)}
      >
        <div className={classes.paper}>keyboard...</div>
      </Modal>
    </div>
  );
};

export default withStyles(styles)(Header);
