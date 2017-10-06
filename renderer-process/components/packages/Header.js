import React from 'react';
import SearchBox from './SearchBox';

const Header = (props) => {
  return (
    <div className="packages__head">
      <div className="packages__title">
        <span>{props.title}</span>
      </div>
      <div className="packages__actions">
        <div className="packages__action">
          <i className="fa fa-fw fa-refresh" title="Reload"></i>
        </div>
        <div className="packages__action dropdown">
          <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
          <ul className="dropdown-menu dropdown-menu-right">
            <li className="dropdown-header">Do with selected</li>
            <li>
              <a href="">
                <i className="fa fa-fw fa-check"></i>
                <span>Mark as read</span>
              </a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-fw fa-trash"></i>
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header;
