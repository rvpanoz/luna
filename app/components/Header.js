/* eslint-disable-interactive-support-focus */

/**
 * Header component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ipcRenderer, remote } from 'electron';
import { useDispatch, useMappedState } from 'redux-react-hook';
import PropTypes from 'prop-types';

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

import { APP_MODES } from 'constants/AppConstants';
import { onSetMode } from 'models/ui/selectors';
import { onClearPackages } from 'models/packages/selectors';

import SearchBox from './SearchBox';
import styles from './styles/header';
import Settings from './Settings';
import Notifications from './Notifications';

const mapState = ({ common: { notifications, loader } }) => ({
  notifications,
  loader
});

const Header = ({ title, classes }) => {
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const [drawerOpen, toggleDrawer] = useState(false);
  const [settingsOpen, toggleSettings] = useState(false);

  const dispatch = useDispatch();
  const { notifications, loader } = useMappedState(mapState);

  const menuOpen = Boolean(anchorEl);
  const notificationsOpen = Boolean(notifications.length && notificationsEl);

  const handleDirectory = useCallback(directory => {
    onClearPackages(dispatch);
    onSetMode(dispatch, { mode: APP_MODES.LOCAL, directory });
    toggleDrawer(false);
  }, []);

  useEffect(
    () => {
      ipcRenderer.on('loaded-packages-close', (event, directories) => {
        setOpenedDirectories(directories);
      });

      return () => ipcRenderer.removeAllListeners('loaded-packages-close');
    },
    [openedDirectories.length]
  );

  const openPackage = useCallback(() => {
    remote.dialog.showOpenDialog(
      remote.getCurrentWindow(),
      {
        title: 'Open package.json file',
        buttonLabel: 'Analyze',
        filters: [
          {
            name: 'package.json',
            extensions: ['json']
          }
        ],
        properties: ['openFile']
      },
      filePath => {
        if (filePath) {
          const directory = filePath.join('');
          handleDirectory(directory);
        }
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open menu"
            onClick={() => toggleDrawer(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            {title}
          </Typography>
          <SearchBox disabled={loader && loader.loading} />
          <div className={classes.grow} />
          <div className={classes.headerToolbar}>
            <IconButton
              color="inherit"
              aria-owns={menuOpen ? 'app-settings' : undefined}
              aria-haspopup="true"
              onClick={e => {
                setAnchorEl(e.currentTarget);
              }}
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              classes={{
                paper: classes.settingsMenu
              }}
              transitionDuration={0}
              id="app-settings"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => toggleSettings(true)}>Settings</MenuItem>
              <MenuItem onClick={() => false}>Help</MenuItem>
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
              transitionDuration={0}
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
              onClose={() => setNotificationsEl(null)}
            >
              <Notifications
                notifications={notifications}
                close={() => setNotificationsEl(null)}
              />
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
          <IconButton onClick={() => toggleDrawer(!drawerOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.list}>
          <List>
            <ListItem button onClick={() => openPackage()}>
              <ListItemIcon>
                <Icon className={classes.iconHover}>archive</Icon>
              </ListItemIcon>
              <ListItemText primary="Open package" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Icon>folder_open</Icon>
              </ListItemIcon>
              <ListItemText primary="My History" />
            </ListItem>
            {openedDirectories &&
              openedDirectories.map((dir, idx) => (
                <ListItem
                  key={`directory-${idx + 1}`}
                  style={{ marginLeft: '10px' }}
                >
                  <ListItemText
                    className={classes.listItem}
                    primary={
                      <a
                        onClick={() => handleDirectory(dir.directory)}
                        href="#"
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
        onClose={() => setAnchorEl(null)}
      >
        <div className={classes.paper}>
          <Settings onClose={() => toggleSettings(false)} />
        </div>
      </Modal>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Header);
