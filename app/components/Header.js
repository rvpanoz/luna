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

const Header = props => {
  const [menuOpen, toggleMenu] = useState(false);
  const menuWrapperRef = useRef(null);
  const menuRef = useRef(null);
  const menuContainerRef = useRef(null);

  const handleMenu = () => {
    const menuStatusBool = Boolean(menuOpen);
    const newMenuStatus = !menuStatusBool;
    const menuWrapperEl = menuWrapperRef && menuWrapperRef.current;
    const menuNavEl = menuRef && menuRef.current;
    const menuContainerEl = menuContainerRef && menuContainerRef.current;
    console.log(newMenuStatus);
    toggleMenu(newMenuStatus);

    if (newMenuStatus) {
      menuWrapperEl.classList.add(active);
      menuWrapperEl.classList.remove(nonActive);
      menuContainerEl.classList.add(barActive);
      menuNavEl.style.display = 'block';
    } else {
      menuWrapperEl.classList.remove(active);
      menuWrapperEl.classList.add(nonActive);
      menuNavEl.style.display = 'none';
    }
  };

  return (
    <header className={navbar}>
      <div
        ref={menuContainerRef}
        className={menuContainer}
        onClick={e => handleMenu()}
      >
        <div className={bar} />
      </div>

      <div ref={menuWrapperRef} className={overlay}>
        <nav ref={menuRef}>
          <ul>
            <li>
              <a href="#">Action_1</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
