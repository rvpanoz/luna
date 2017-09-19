/**
 * Sidebar component
 */

import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sidebar">
        <div className="quickmenu">
          <div className="quickmenu__cont">
            <div className="quickmenu__list">
              <div className="quickmenu__item active">
                <div className="fa fa-fw fa-home"></div>
              </div>
              <div className="quickmenu__item">
                <div className="fa fa-fw fa-envelope-o"></div>
              </div>
              <div className="quickmenu__item new">
                <div className="fa fa-fw fa-comments-o"></div>
              </div>
              <div className="quickmenu__item">
                <div className="fa fa-fw fa-feed"></div>
              </div>
              <div className="quickmenu__item">
                <div className="fa fa-fw fa-cog"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
