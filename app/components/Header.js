/* eslint-disable-interactive-support-focus */

import React, { useState, useRef } from 'react';
import cn from 'classnames';
import styles from '../styles/spectre.min.css';
import headerStyles from '../styles/header.css';

const { navbar } = styles;

const {
  bar,
  overlay,
  active,
  'non-active': nonActive,
  'bar-active': barActive,
  'menu-container': menuContainer
} = headerStyles;

function Header(props) {
  const [menuOpen, toggleMenu] = useState(false);
  const menuWrapperRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  return (
    <header className={navbar}>
      <div
        ref={menuContainerRef}
        className={cn(menuContainer, {
          [barActive]: menuOpen
        })}
        onClick={e => toggleMenu(!menuOpen)}
        role="menu"
      >
        <div className={bar} />
      </div>

      <div
        ref={menuWrapperRef}
        className={cn(overlay, {
          [active]: menuOpen,
          [nonActive]: !menuOpen
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

export default Header;
