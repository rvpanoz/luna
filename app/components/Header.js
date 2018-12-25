/* eslint-disable */
/* eslint-disable-interactive-support-focus */

import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

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

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

import styles from './styles/header';
import Settings from './Settings';

const Header = props => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, toggleDrawer] = useState(false);
  const [settingsOpen, toggleSettings] = useState(false);
  const [keyboardOpen, toggleKeyboard] = useState(false);
  const menuOpen = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open menu"
            onClick={e => toggleDrawer(e)}
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
            <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
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
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsIcon /> : <NotificationsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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
