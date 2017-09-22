/**
 * List component
 *
 * shows global installed modules
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import AppLoader from './../common/AppLoader';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      modules: []
    }
    this.getInfo = this.getInfo.bind(this);
  }
  getInfo() {
    ipcRenderer.send('get-package-info', this.props);
  }
  render() {
    return (
      <div className="col-ls-12 col-md-12 col-xs-12" ref="root">
        <div className="ui-item">
          <div className="ui-heading clearfix">
            <h5>
              <a href="#">{this.props.name}</a>
            </h5>
          </div>
          <span></span>
          <p></p>
        </div>
      </div>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      modules: []
    }
  }
  componentWillMount() {
    this.setState({
      loader: true
    }, () => {
      ipcRenderer.send('get-global-modules');
    });
  }
  componentDidMount() {
    ipcRenderer.on('get-package-info-reply', (event, data) => {
      console.log(data);
    });
    ipcRenderer.on('get-global-modules-reply', (event, modules) => {
      let root = this.refs.root;
      if (root) {
        let data = this.parse(modules);
        this.setState({
          modules: data,
          loader: false
        });
      }
    });
  }
  componentWillUnmount() {
    this.setState({
      loader: false,
      modules: []
    });
  }
  parse(data) {
    let modules = data.dependencies;
    let arr = [];

    for(let z in modules) {
      let mod = {
        name: z,
        info: modules[z]
      }
      arr.push(mod);
    }
    return arr;
  }
  render() {
    let modules = this.state.modules;
    if(!modules) {
      return null;
    }
    console.log(modules[0]);
    return (
      <div>
        <AppLoader isVisible={this.state.loader} />
          <div className="row" ref="root">
            {modules.map((module, idx) => {
              return <ListItem key={idx} {...module}/>
            })}
          </div>
      </div>
    )
  }
}

export default List;
