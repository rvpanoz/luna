import React from 'react';
import {remote, ipcRenderer} from 'electron';
import styles from './Packages.css';

class PackagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    this._fetch = this._fetch.bind(this);
    this._updateMode = this._updateMode.bind(this);
  }
  _fetch(e) {
    e.preventDefault();
    this.props.loadData();
  }
  _updateMode(e) {
    e.preventDefault();
    this.props.setMode('GLOBAL');
    this.props.loadData('GLOBAL');
  }
  render() {
    let props = this.props;
    return (
      <div className={styles.packages__head}>
        <div className={styles.packages__title}>
          <span>{props.title}</span>&nbsp;
          <span className="label" style={{
            color: '#fff'
          }}>{props.total}</span>
        </div>
        <div className={styles.packages__actions}>
          <div className={styles.packages__action}>
            <i className="fa fa-fw fa-refresh" onClick={this._fetch} title="Reload"></i>
          </div>
          <div className={`${styles.packages__action} dropdown`}>
            <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
            <ul className="dropdown-menu dropdown-menu-right">
              <li className="dropdown-header">Actions</li>
              <li>
                <a href="#" onClick={this._updateMode}>
                  <i className="fa fa-fw fa-reply"></i>
                  <span>Switch to global mode</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PackagesListHeader;
