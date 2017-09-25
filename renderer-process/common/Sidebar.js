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
            <Link to="/packages" href="#">
              <i className="fa fa-list fa-2x"></i>
              <span className="nav-text">
                Packages
              </span>
            </Link>
          </li>
        </ul>

        <ul className="settings">
          <li>
            <Link to="/settings">
              <i className="fa fa-cog fa-2x"></i>
              <span className="nav-text">
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
