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
  componentDidUpdate(prevProps, prevState) {
    // console.log(arguments);
  }
  setActive(module) {
    this.setState({
      active: module
    });
  }
  componentDidMount() {
    ipcRenderer.on('get-package-info-reply', (event, data) => {
      this.setActive(data);
    });
  }
  render() {
    return (

        <div className="packages-page" ref="rootElement">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6">
              <List />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-6">
              <ItemDetails module={this.state.active}/>
            </div>
          </div>
        </div>
    )
  }
}

export default Packages;
