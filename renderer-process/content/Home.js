/**
 * Home component
 */
'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">

      </div>
    )
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    ipcRenderer.send('get-global-modules');
  }
  componentDidMount() {
    ipcRenderer.on('get-global-modules-reply', (event, modules) => {
      console.log(modules);
    });
  }
  render() {
    return (
      <div className="main">
        <div className="main__cont">
          <div className="main-heading">
            <div className="main-title"></div>
            <div className="main-filter">
              <form className="main-filter__search">
                <div className="input-group">
                  <input className="form-control" type="text" placeholder="Search..."/>
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <div className="fa fa-search"></div>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="container-fluid half-padding">

          </div>
        </div>
      </div>
    )
  }
}
