/**
* PackageDetails
**/

'use strict';

import {remote, ipcRenderer, shell} from 'electron';
import React from 'react';
import moment from 'moment';
import Loader from '../../common/Loader';
import PackageActions from './PackageActions';
import PackageTabs from './PackageTabs';
import { showMessageBox, isUrl } from '../../utils';
import {OPTIONS} from '../../constants/Command';
import styles from './PackageDetails.css';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.navigate = this.navigate.bind(this);
    this.doAction = this.doAction.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
  }
  addOption(e) {
    let option = e.target.dataset.option;
    if(option && typeof option === 'string') {
      this.props.addCommandOption(option);
    }
  }
  navigate(e) {
    e.preventDefault();
    let url = e.target.dataset.url;
    if(isUrl(url)) {
      shell.openExternal(url);
    }
    return false;
  }
  doAction(e) {
    e.preventDefault();
    let target = e.currentTarget;
    let action = target.dataset.action;
    let mode = this.props.mode;

    if (action && typeof action === 'string') {
      let active = this.props.active;
      let selectVersion = this.refs.selectVersion;
      let version, options = this.props.cmdOptions;
      if(action === 'Uninstall') {
        version = null;
      } else {
        version = (selectVersion && selectVersion.value !== "false")
          ? selectVersion.value
          : 'latest';
      }

      showMessageBox({
          action: action,
          name: active.name,
          version: version
        }, () => {
          this.props.setActive(null);
          this.props.toggleMainLoader(true);
          ipcRenderer.send('ipc-event', {
            mode: this.props.mode,
            directory: this.props.directory,
            ipcEvent: action,
            cmd: [(action === 'Uninstall') ? 'uninstall' : 'install'],
            pkgName: active.name,
            pkgVersion: (action === 'Uninstall') ? null : version,
            pkgOptions: options
          });
        });
    }
    return false;
  }
  onChangeVersion(e) {
    let target = e.currentTarget;
    let pkg = this.props.active;
    let version = target.value;

    if (version !== "false") {
      this.props.toggleMainLoader(true);
      ipcRenderer.send('ipc-event', {
        mode: this.props.mode,
        directory: this.props.directory,
        ipcEvent: 'view-package',
        cmd: ['view'],
        pkgName: pkg.name,
        pkgVersion: version
      });
    }
    return false;
  }
  render() {
    let pkg = this.props.active;
    if (!pkg) {
      return null;
    }
    return (
      <div className={styles.package__details} ref="root">
        <div className={styles.package__details__head}>
          <div className={styles.package__details__title}>
            <div className={styles.package__details__tag}>
              <i className="fa fa-fw fa-tag"></i>
            </div>
            &nbsp;{pkg.name}&nbsp;
            <span className="label label-success">v{pkg.version}</span>
          </div>
          <div className={styles.package__details__actions}>
            <PackageActions
              mode={this.props.mode}
              directory={this.props.directory}
              active={this.props.active}
              setActive={this.props.setActive}
              toggleMainLoader={this.props.toggleMainLoader}
              doAction={this.doAction}
              packageActions={this.props.packageActions}
            />
          </div>
        </div>
        <div className={styles.package__details__info}>
          <div className={styles.package__details__info__top}>
            <div className={styles.package__details__version}>
              <div className="form-group">
                <label htmlFor="selectVersion">
                  <span>Select version</span>
                </label>
                <select value={pkg.version} onChange={this.onChangeVersion} className="form-control input-sm select-mini" ref="selectVersion">
                  <option value="false">-</option>
                  {pkg.versions.map((version, idx) => {
                    return <option key={idx} value={version}>{version}</option>
                  })}
                </select>
              </div>
            </div>
            <div className={styles.package__details__date}>
              Updated:&nbsp; {moment(pkg.time.modified).format('DD/MM/YYYY')}
            </div>
          </div>
          <div className={styles.package__details__options} title="options">
            {
              OPTIONS.map((option, idx) => {
                let opt = option.split('*');
                return (
                  <label key={idx} className="with-square-checkbox" title={opt[1]}>
                    <input type="checkbox" onChange={this.addOption} data-option={opt[0]}/>
                    <span>{opt[0]}</span>
                  </label>
                )
              })
            }
          </div>
        </div>
        <div className={styles.package__details__body}>
          <Loader loading={this.props.isLoading}>
            <PackageTabs pkg={pkg} navigate={this.navigate} addOption={this.addOption}/>
          </Loader>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
