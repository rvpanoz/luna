import React from 'react';

const TopMenuItem = (props) => {
  return (
    <li>
      <a href={props.href}><span>{props.text}</span></a>
    </li>
  )
}

export default TopMenuItem;
