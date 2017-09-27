'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

const ModuleLoader = (props) => {
  return (
    <span className={props.loader
      ? 'show'
      : 'hide'}>Loading..</span>
  )
}

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    ipcRenderer.send('get-info-by-version', this.props.name, this.props.version);
    return false;
  }
  render() {
    return (
      <a href="#" className="list-group-item" onClick={this.onItemClick} ref={`root-${this.props.idx}`}>
        {this.props.name}
        <span className="badge badge-green version">
          v{this.props.version}
        </span>
      </a>
    )
  }
}
