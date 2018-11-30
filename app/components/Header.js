import React from 'react';
import cn from 'classnames';
import styles from '../styles/spectre.min.css';

const {
  navbar,
  btn,
  'navbar-section': section,
  'navbar-brand mr-2': brand,
  'navbar-center': center,
  'btn-link': link,
  'btn-primary': btnPrimary,
  'input-group': group,
  'input-group-btn': groupBtn,
  'input-inline': inline,
  'form-input': input
} = styles;

const Header = props => {
  return (
    <header className={navbar} style={{ padding: '5px' }}>
      <section className={section}>
        <a href="..." className={cn(btn, link)} style={{ color: '#fff' }}>
          Docs
        </a>
        <a href="..." className={cn(btn, link)} style={{ color: '#fff' }}>
          GitHub
        </a>
      </section>
      <section className={center}>~luna~</section>
      <section className={section}>
        <div className={cn(group, inline)}>
          <input className={input} type="text" placeholder="search" />
          <button className={cn(btn, btnPrimary, groupBtn)}>Search</button>
        </div>
      </section>
    </header>
  );
};

export default Header;
