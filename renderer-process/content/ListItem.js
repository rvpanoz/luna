'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    let props = this.props;
    let target = e.target;

    this.props.deselect();
    target.classList.add('selected');
    ipcRenderer.send('view-by-version', props.name, props.version);
    return false;
  }
  render() {
    return (
      <div className="item" ref={`root-${this.props.idx}`}>
        <div className="flex-row">
          <a href="#" onClick={this.onItemClick}>
            {this.props.name}
          </a>
          <span style={{width: '20%', height: '15px'}}>{this.props.version}</span>
        </div>
      </div>

    )
  }
}
