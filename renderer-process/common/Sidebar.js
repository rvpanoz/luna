/**
 * About
 */

import React from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="main-menu">
        <ul>
          <li className="has-subnav">
            <Link to="/" href="#">
              <span className="nav-icon">
                <img src="./assets/images/npm.png" alt="npm"/>
              </span>
            </Link>
          </li>
        </ul>

        <ul className="settings">
          <li>
            <Link to="/settings">
              <span className="nav-icon">
                <i className="fa fa-cog"></i>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
