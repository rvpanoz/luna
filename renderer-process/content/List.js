/**
 * List component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {parse} from './../../utils';
import Loader from './../common/Loader';
import ListItem from './ListItem';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: this.props.loader || true,
      packages: []
    }
    this.deselect = this.deselect.bind(this);
    this.updatePackages = this.updatePackages.bind(this);
  }
  componentWillReceiveProps(props) {
    let loader = props.loading;
    if(loader && loader == true) {
      this.setState({
        loader: loader
      });
    }
  }
  componentWillMount() {
    ipcRenderer.send('get-packages');
  }
  componentDidMount() {
    ipcRenderer.on('get-packages-reply', (event, packages) => {
      this.updatePackages(packages);
    });
    ipcRenderer.on('search-packages-close', (event, packages) => {
      this.updatePackages(packages);
    });
  }
  deselect() {
    let list = this.refs.list;
    if(list) {
      let selected = list.querySelector('.selected');
      if(selected) {
        selected.classList.remove('selected');
      }
    }
  }
  updatePackages(packages) {
    this.setState({
      loader: false,
      packages: parse(packages, 'dependencies')
    });
  }
  render() {
    let packages = this.state.packages;
    return (
      <Loader loading={this.state.loader}>
        <div className="list" ref="list">
          {(packages && packages.length)
            ? packages.map((pkg, idx) => {
              pkg.name = (pkg.from)
                ? pkg.from.split("@")[0]
                : pkg.name;
              return <ListItem deselect={this.deselect} idx={idx} key={idx} {...pkg}/>
            })
            : null}
        </div>
      </Loader>
    )
  }
}
