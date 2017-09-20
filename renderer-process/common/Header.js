/**
 * Header component
 *
 */

'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-static-top header-navbar">
        <div className="topnavbar">
          <ul className="nav navbar-nav navbar-left">
            <li>
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
