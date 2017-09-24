/**
 * List component
 *
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import AppLoader from './../common/AppLoader';
import ListItem from './ListItem';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      modules: []
    }
  }
  updateModules(modules) {
    let rootElement = this.refs.rootElement;
    let data = this.parse(modules);
    this.setState({modules: data, loader: false});
  }
  parse(data) {
    let modules = data.dependencies;
    let arr = [];

    for (let z in modules) {
      let mod = {
        name: z,
        info: modules[z]
      }
      arr.push(mod);
    }
    return arr;
  }
  componentWillMount() {
    this.setState({
      loader: true
    }, () => {
      ipcRenderer.send('get-global-modules');
    });
  }
  componentDidMount() {
    ipcRenderer.on('get-global-modules-reply', (event, modules) => {
      this.updateModules(modules);
    });
    ipcRenderer.on('get-latest-version-reply', (event, latest_version) => {

    });
  }
  render() {
    let modules = this.state.modules;
    if(!modules.length && this.state.loader == false) {
      return null;
    }
    return (
      <AppLoader loading={this.state.loader}>
      <table className="table table-responsive" ref="rootElement">
        <tbody>
          {modules.map((module, idx) => {
            return <ListItem idx={idx} key={idx} {...module}/>
          })}
        </tbody>
      </table>
    </AppLoader>
    )
  }
}
