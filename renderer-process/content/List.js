/**
 * List component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import SearchBar from './../common/SearchBar';
import ListItem from './ListItem';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: []
    }
  }
  componentWillMount() {
    ipcRenderer.send('get-packages');
  }
  componentDidMount() {
    ipcRenderer.on('get-packages-reply', (event, packages) => {
      let data = JSON.parse(packages);
      if (this.refs.list) {
        this.setState({
          packages: Object.keys(data.dependencies).map(function(key) {
            return data.dependencies[key];
          })
        });
      }
    });
  }
  render() {
    let packages = this.state.packages;
    console.log(packages);
    return (
        <div className="item">
          <div className="header">Packages</div>
          <div className="search-bar">
            <SearchBar />
          </div>
          <div className="list" ref="list">
            {(packages && packages.length)
              ? packages.map((pkg, idx) => {
                pkg.name = pkg.from.split("@")[0];
                return <ListItem idx={idx} key={idx} {...pkg}/>
              })
              : null}
        </div>
      </div>
    )
  }
}
