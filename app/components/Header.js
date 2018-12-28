/* eslint-disable */
/* eslint-disable-interactive-support-focus */

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';
import { useMappedState } from 'redux-react-hook';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
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

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ModuleIcon from '@material-ui/icons/ViewModule';

import Popover from '@material-ui/core/Popover';
import Fade from '@material-ui/core/Fade';

import Tiles from './layout/Tiles';
import styles from './styles/header';
import Settings from './Settings';

const mapState = state => ({
  notifications: state.common.notifications
});

const Header = props => {
  const { classes } = props;
  const [openedDirectories, setOpenedDirectories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperEl, setPopperEl] = useState(null);
  const [drawerOpen, toggleDrawer] = useState(false);
  const [settingsOpen, toggleSettings] = useState(false);
  const [keyboardOpen, toggleKeyboard] = useState(false);

  const { notifications } = useMappedState(mapState);

  const menuOpen = Boolean(anchorEl);
  const popperOpen = Boolean(popperEl);

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
      <AppBar position="fixed">
        <Toolbar>
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
            Luna
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for packages…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
                setPopperEl(e.currentTarget);
              }}
            >
              <ModuleIcon />
            </IconButton>
            <Popover
              id="managers-popover"
              open={popperOpen}
              anchorEl={popperEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
              onClose={e => setPopperEl(null)}
            >
              <Tiles />
            </Popover>
            <IconButton color="inherit">
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
              <ListItemText primary="History" />
            </ListItem>
            {openedDirectories &&
              openedDirectories.map((pkg, idx) => (
                <ListItem
                  key={`directory-${idx}`}
                  dense={true}
                  style={{ marginLeft: '10px' }}
                >
                  <ListItemText
                    className={classes.listItem}
                    primary={
                      <a
                        onClick={e => console.log(pkg.directory)}
                        href="#sub-labels-and-columns"
                        className={classes.link}
                      >
                        {pkg.name}
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
        className={classes.modal}
      >
        <div className={classes.settings}>
          <Settings onClose={e => toggleSettings(false)} />
        </div>
      </Modal>
      <Modal
        aria-labelledby="keyboard"
        aria-describedby="keyboard"
        open={keyboardOpen}
        onClose={e => toggleKeyboard(false)}
      >
        <div className={classes.paper}>keyboard...</div>
      </Modal>
    </div>
  );
};

export default withStyles(styles)(Header);
