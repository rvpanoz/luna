import React from 'react';
import {Link} from 'react-router-dom';

const TopMenuItem = (props) => {
  return (
    <li className={props.className}>
      <Link to={props.href}><span>{props.text}</span></Link>
    </li>
  )
}

export default TopMenuItem;
