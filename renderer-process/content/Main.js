/**
 * Main component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activepkg: null
    }
  }
  componentDidMount() {
    let content = this.refs.root;
    if(content) {
      ipcRenderer.on('view-by-version-reply', (event, data) => {
        this.setState({
          activepkg: data
        });
      });
    }
  }
  render() {
    let pkg = this.state.activepkg;
    console.log(pkg);
    return (
      <div className="main" ref="root">
        {(pkg) ?
          <div className="ui container">
            <div className="ui basic padded segment">
              <h1 className="ui header" style={{marginBottom: '0.25em'}}>
                {pkg.name}&nbsp;v{pkg.version}
                <div className="sub header">
                  Author:&nbsp;{pkg.author}
                </div>
              </h1>
            </div>
            <div className="ui basic padded segment">
              <div className="tab-wrap">
                <input id="tab1" type="radio" name="tabs" defaultChecked/>
                <label htmlFor="tab1">Details</label>
                <input id="tab2" type="radio" name="tabs"/>
                <label htmlFor="tab2">Contributors</label>
                <input id="tab3" type="radio" name="tabs"/>
                <label htmlFor="tab3">Dependencies</label>
                <section id="details-content">
                  <div className="detail-description">
                    {pkg.description}
                  </div>
                </section>
                <section id="contributors-content">

                </section>
                <section id="dependencies-content">

                </section>
              </div>
            </div>
          </div>
        : null}
      </div>
    )
  }
}
