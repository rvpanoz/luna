import React from 'react';

const TopMenuItem = (props) => {
  return (
    <li className={props.className}>
      <a onClick={props.onClick} href={props.href}><span>{props.text}</span></a>
    </li>
  )
}

export default TopMenuItem;
