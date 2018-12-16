/* eslint-disable */
/* eslint-disable-interactive-support-focus */

import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import SearchBar from './SearchBar';
import styles from './styles/header';

function Header(props) {
  const { classes } = props;

  const [menuOpen, toggleMenu] = useState(false);
  const menuWrapperRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  return (
    <header className={classes.navBar}>
      <SearchBar className={classes.textField} />
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
            [classes.close]: menuOpen
          })}
        />
      </div>

      <div
        ref={menuWrapperRef}
        className={cn(classes.overlay, {
          [classes.active]: menuOpen,
          [classes.non_active]: !menuOpen
        })}
      >
        <nav ref={menuRef}>
          {/* <ul>
            <li>
              <a href="#">Analyze</a>
            </li>
          </ul> */}
        </nav>
      </div>
    </header>
  );
}

export default withStyles(styles)(Header);
