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
    let el = this.refs[`root-${this.props.idx}`];
    if(el) {
      let props = this.props;
      ipcRenderer.send('view-by-version', props.name, props.version);
    }
    return false;
  }
  render() {
    return (
      <a href="#" className="item" onClick={this.onItemClick} ref={`root-${this.props.idx}`}>
        {this.props.name}
        <i>{this.props.version}</i>
      </a>
    )
  }
}
