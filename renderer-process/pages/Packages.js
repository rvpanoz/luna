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
    ipcRenderer.on('view-by-version-reply', (event, packageData) => {
      let root = this.refs.rootElement;
      if(root) {
        this.setActive(packageData);
      }
    });
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('view-by-version-reply');
  }
  render() {
    // <AppLoader loading={this.state.loader}></AppLoader>
    return (
      <div className="packages-page" ref="rootElement">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <List setActive={this.setActive}/>
          </div>
          <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            <ItemDetails packageItem={this.state.active} />
          </div>
        </div>
      </div>
    )
  }
}

export default Packages;
