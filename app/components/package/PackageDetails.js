import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import AppModal from '../../common/AppModal';
import PackageActions from './PackageActions';
import PackageTabs from './PackageTabs';
import {showMessageBox} from '../../utils';
import styles from './PackageDetails.css';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.doAction = this.doAction.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
  }
  doAction(e) {
    e.preventDefault();

    let target = e.currentTarget;
    let action = target.querySelector('b').innerHTML.trim().toLowerCase();

    if (action && typeof action === 'string') {
      let active = this.props.active;
      let selectVersion = this.refs.selectVersion;
      let version = (selectVersion && selectVersion.value !== "false")
        ? selectVersion.value
        : 'latest';

      showMessageBox({
          action: action,
          name: active.name,
          version: version
        }, () => {
          this.props.setModal(true);
          ipcRenderer.send('ipc-event', {
            ipcEvent: action,
            cmd: [(action === 'uninstall') ? 'uninstall' : 'install'],
            pkgName: active.name,
            pkgVersion: (action === 'uninstall') ? null : version,
            params: ['g']
          });
          // this.props.setActive(null);
          // this.props.toggleMainLoader(true);
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
        ipcEvent: 'view-package',
        cmd: ['view'],
        pkgName: pkg.name,
        pkgVersion: version,
        params: ['g', 'long']
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
            <PackageActions packageActions={this.props.packageActions} doAction={this.doAction}/>
          </div>
        </div>
        <div className={styles.package__details__info}>
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
          <div className={styles.package__details__name}>
            {(pkg.deprecated === false) ? <label className="label label-danger">Deprecated</label> : null}
          </div>
          <div className={styles.package__details__date} ref="npmLog"></div>
        </div>
        <div className={styles.package__details__body}>
          <Loader loading={this.props.isLoading}>
            <PackageTabs pkg={pkg}/>
          </Loader>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
