/**
 * Packages component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import List from './../content/List';
import ItemDetails from './../content/ItemDetails';

class Packages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    }
    this.setActive = this.setActive.bind(this);
  }
  setActive(packageData) {
    this.setState({
      active: packageData
    });
  }
  componentDidMount() {
    ipcRenderer.on('get-info-by-version-reply', (event, packageData) => {
      let root = this.refs.rootElement;
      if(root) {
        this.setActive(packageData);
      }
    });
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('get-info-by-version-reply');
  }
  render() {
    return (
      <div className="packages-page" ref="rootElement">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <List setActive={this.setActive}/>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            <ItemDetails module={this.state.active}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Packages;
