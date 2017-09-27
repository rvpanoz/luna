/**
 * ItemDetails component
 */

'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Semver from 'semver-compare';
import AppLoader from './../common/AppLoader';
import {
  OptionItems,
  StaticList
} from './../common/Statics';

export default class ItemDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needsUpdate: false
    }
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
  }
  update(e) {
    e.preventDefault();
    let packageItem = this.props.packageItem;
    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will update ${packageItem.name} to the latest version. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          ipcRenderer.send('update-package', packageItem.name);
          break;
        default:
          return;
      }
    });
  }
  uninstall(e) {
    e.preventDefault();
    let packageItem = this.props.packageItem;

    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      type: 'question',
      message: `This action will uninstall ${packageItem.name} from your system. \nAre you sure? `,
      buttons: ['OK', 'CANCEL']
    }, (btnIdx) => {
      switch (btnIdx) {
        case 0:
          ipcRenderer.send('uninstall-package', packageItem.name);
          break;
        default:
          return;
      }
    });
  }
  componentWillReceiveProps(props) {
    let activePkg = props.packageItem, diff = 0;
    let latestVersion = activePkg['dist-tags'].latest;
    let installedVersion = activePkg.version;

    //compare versions
    diff = Semver(latestVersion, installedVersion);
    if(diff === 1) {
      this.setState({
        needsUpdate: true
      });
    }
  }
  render() {
    let packageItem = this.props.packageItem;
    if (!packageItem) {
      return null;
    }

    let latestVersion = packageItem['dist-tags'].latest;
    let currentVersion = packageItem.version;

    return (
      <div className="package-details">
        <div className="detail tile">
          <section className="detail-body">
            <div className="detail-top">
              <h2 className="detail-heading">{packageItem.name}</h2>
              <div className="flex-row">
                <div className="version">Latest:&nbsp;v{latestVersion}&nbsp;
                  <a href="#" className={(this.state.needsUpdate) ? 'show' : 'hide'}
                  onClick={this.update}>Update</a></div>
                <div className="actions">
                  <a onClick={this.uninstall} href="#" className="btn btn-red btn-sm">Uninstall</a>
                </div>
              </div>
            </div>
            <div className="tab-wrap">
              <input id="tab1" type="radio" name="tabs" defaultChecked/>
              <label htmlFor="tab1">Details</label>
              <input id="tab2" type="radio" name="tabs"/>
              <label htmlFor="tab2">Contributors</label>
              <input id="tab3" type="radio" name="tabs"/>
              <label htmlFor="tab3">Dependencies</label>
              <section id="details-content">
                <p className="detail-tags">{packageItem.author}</p>
                <div className="version">v{currentVersion}</div>
                <div className="detail-description">
                  {packageItem.description}
                </div>
              </section>
              <section id="contributors-content">
                <StaticList data={packageItem.maintainers}/>
              </section>
              <section id="dependencies-content">
                <StaticList data={packageItem.dependencies}/>
              </section>
            </div>
          </section>
          <footer className="detail-footer">
            <ul className="detail-links">
              <li></li>
              <li></li>
            </ul>
          </footer>
        </div>
      </div>
    )
  }
}
