'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

class messagesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.updatePackage = this.updatePackage.bind(this);
  }
  updatePackage(e) {
    e.preventDefault();
    let pkg = this.props.package;
    this.props.setActive(null);
    this.props.toggleMainLoader(true);
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'view-package',
      cmd: ['view'],
      pkgName: pkg.name,
      pkgVersion: pkg.details.current,
      params: ['g', 'long']
    });
  }
  componentDidMount() {
    let el = this.refs.root;
    if (el) {
      el.classList.add('fadeIn');
    }
  }
  render() {
    let pkg = this.props.package;
    return (
      <div className="lm-widget__item new animated" ref="root">
        <div className="lm-widget__title">
          <i className="label label-danger">{pkg.details.latest}</i>&nbsp;
          <span>{pkg.name}</span>
        </div>
        <div className="lm-widget__text">
          <small>current:&nbsp;{pkg.details.current}</small>
        </div>
        <a className="lm-widget__link" href="#" onClick={this.updatePackage}></a>
      </div>
    )
  }
}

export default messagesListItem;
