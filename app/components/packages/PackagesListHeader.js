import React from 'react';
import { remote, ipcRenderer} from 'electron';
import {loadData} from '../../utils';
import styles from './Packages.css';

class PackagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    this._fetch = this._fetch.bind(this);
  }
  _fetch(e) {
    e.preventDefault();
    loadData();
  }
  render() {
    let props = this.props;
    return (
      <div className={styles.packages__head}>
        <div className={styles.packages__title}>
          <span>{props.title}</span>&nbsp;
          <span className="label" style={{color: '#fff'}}>{props.total}</span>
        </div>
        <div className={styles.packages__actions}>
          <div className={styles.packages__action}>
            <i className="fa fa-fw fa-refresh" onClick={this._fetch} title="Reload"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default PackagesListHeader;
