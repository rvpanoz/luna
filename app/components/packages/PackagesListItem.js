import {remote, ipcRenderer} from 'electron';
import React from 'react';
import styles from './Packages.css';

class PackageItem extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    let el = this.refs[`root-${this.props.idx}`];
    let isSelected = el.classList.contains('selected');
    if(!isSelected) {
      this.props.deselectAll();
      this.props.toggleMainLoader(true);
      el.classList.add('selected');
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'view-package',
        cmd: 'view',
        pkgName: this.props.name,
        pkgVersion: this.props.version,
        params: ['g', 'long']
      });
    }
    return false;
  }
  render() {
    let props = this.props;
    if(!props.name) {
      return null;
    }
    return (
      <div ref={`root-${this.props.idx}`} className={styles.packages__item} onClick={this.onItemClick}>
        <div className={styles.packages__item__head}>
          <div className={styles.packages__item__name}>
            <span>{props.name}</span>&nbsp;
            <span style={{float: 'right'}} className="label label-success">{props.version}</span>
          </div>
          <div className={styles.packages__item__text}>
            <span>&nbsp;{props.description}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default PackageItem
