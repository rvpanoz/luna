/* eslint-disable */
/* eslint-disable-interactive-support-focus */

import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import SearchBar from './SearchBar';
import styles from './styles/header';

import Settings from './Settings';

function Header(props) {
  const { classes } = props;

  const [menuOpen, toggleMenu] = useState(false);
  const menuWrapperRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  return (
    <header className={classes.navBar}>
      <SearchBar />
      <div
        ref={menuContainerRef}
        className={cn(classes.menu_container, {
          [classes.barActive]: menuOpen
        })}
        onClick={e => toggleMenu(!menuOpen)}
        role="menu"
      >
        <div
          className={cn(classes.bar, {
            [classes.barActive]: menuOpen
          })}
        />
      </div>

      <div
        ref={menuWrapperRef}
        className={cn(classes.overlay, {
          [classes.active]: menuOpen,
          [classes.inactive]: !menuOpen
        })}
      >
        <div
          className={cn(classes.items, {
            [classes.visible]: menuOpen
          })}
        >
          <Settings />
        </div>
      </div>
    </header>
  );
}

export default withStyles(styles)(Header);
