import React from 'react';

const PackageActions = (props) => {
  function renderItems(mode) {
    switch (mode) {
      case 'SEARCH':
        return (
          <ul className="dropdown-menu dropdown-menu-right">
            <li>
              <a href="#">
                <span>Install</span>
              </a>
            </li>
          </ul>
        )
        break;
      default:
      return (
        <ul className="dropdown-menu dropdown-menu-right">
        <li>
          <a href="#">
            <span>Update</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span>Uninstall</span>
          </a>
        </li>
      </ul>
      )
    }
  }
  return (
    <div className="dropdown">
      <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
      {renderItems(props.mode)}
    </div>
  )
}

export default PackageActions;
