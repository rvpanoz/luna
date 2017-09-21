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
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    let navCollapse = this.refs.navCollapse;
    $(navCollapse).collapse('hide');
  }
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar_main" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand" href="#section_modules">Luna</Link>
          </div>
          <div ref="navCollapse" className="collapse navbar-collapse" id="navbar_main">
            <ul className="nav navbar-right navbar-nav">
              <li className="active">
                <Link to="/" onClick={this.onClick}>Modules</Link>
              </li>
              <li>
                <Link to="/analyze">Analyze</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
