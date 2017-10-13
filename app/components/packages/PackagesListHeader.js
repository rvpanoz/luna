import React from 'react';
import { remote, ipcRenderer} from 'electron';
import styles from './PackagesListHeader.css';

class PackagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    this._reload = this._reload.bind(this);
  }
  _reload(e) {
    this.props.toggleLoader(true);
    this.props.setActive(null);
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      scope: '-g'
    });
  }
  render() {
    let props = this.props;
    return (
      <div className={styles.packages__head}>
        <div className={styles.packages__title}>
          <span>{props.title}</span>
        </div>
        <div className={styles.packages__actions}>
          <div className={styles.packages__action}>
            <i className="fa fa-fw fa-refresh" onClick={this._reload} title="Reload"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default PackagesListHeader;
