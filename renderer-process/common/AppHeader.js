/** TODO
  switch to container component
**/

import React from 'react';
import TopMenu from './menu/TopMenu';

const AppTitle = (props) => {
  return (
    <div className="navbar-header">
      <a className="navbar-brand" href="#">
        <div className="logo text-nowrap">
          <div className="logo__img">
            <i className="fa fa-chevron-right"></i>
          </div>
          <span className="logo__text">{props.title}</span>
        </div>
      </a>
    </div>
  )
}

const TopNavBar = (props) => {
  return (
    <div className="topnavbar">
      <TopMenu />
    </div>
  )
}

export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-static-top header-navbar">
        <AppTitle title={this.props.title}/>
        <TopNavBar/>
      </nav>
    )
  }
}
