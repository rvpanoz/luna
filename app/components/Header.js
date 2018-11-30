import React, { useState, useRef } from 'react';
import cn from 'classnames';
import styles from '../styles/spectre.min.css';
import headerStyles from '../styles/header.css';

const { navbar } = styles;

const {
  bar,
  overlay,
  active,
  'bar-active': barActive,
  'menu-container': menuContainer
} = headerStyles;

const Header = props => {
  const [menuOpen, toggleMenu] = useState(false);
  const menuWrapperRef = useRef(null);
  const menuRef = useRef(null);

  const handleMenu = () => {
    const menuStatusBool = Boolean(menuOpen);

    toggleMenu(!menuStatusBool);

    if (!menuStatusBool === false) {
      menuWrapperRef && menuWrapperRef.current.classList.remove(active);
      menuRef && menuRef.current.classList.remove(visible);
    } else {
      menuWrapperRef && menuWrapperRef.current.classList.add(active);
      menuRef && menuRef.current.classList.add(visible);
      menuRef && menuRef.current.classList.add(hidden);
    }
  };

  return (
    <header className={navbar}>
      <div className={menuContainer} onClick={e => handleMenu()}>
        <div className={bar} />
      </div>

      <div ref={menuWrapperRef} className={overlay}>
        <nav ref={menuRef}>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Work</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
