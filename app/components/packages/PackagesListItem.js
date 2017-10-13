import {remote, ipcRenderer} from 'electron';
import React from 'react';
import styles from './PackagesListItem.css';

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
      el.classList.add('selected');
      ipcRenderer.send('view-by-version', {
        pkgName: this.props.name,
        pkgVersion: this.props.version
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
            <span>&nbsp;{props.name}</span>
          </div>
          <div className={styles.packages__item__date}>
            <span>{props.version}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default PackageItem
