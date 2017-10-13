import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import PackageListItem from './PackagesListItem';
import styles from './PackagesList.css';

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
    this.deselectAll = this.deselectAll.bind(this);
  }
  componentDidMount() {
    //toggle loader
    this.props.toggleLoader(true);

    //ipcRenderer events -
    // ipcRenderer.send('get-packages', {scope: 'g'});
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      scope: '-g'
    });

    //ipcRenderer listeners -
    ipcRenderer.on('get-packages-close', (event, packages) => {
      this.props.setPackages(packages);
      this.props.toggleLoader(false);
      this.props.setMode('GLOBAL', ['Update', 'Uninstall']);
    });
    ipcRenderer.on('search-packages-close', (event, packages) => {
      this.props.setPackages(packages);
      this.props.setMode('SEARCH', ['Install']);
      this.props.toggleLoader(false);
    });
  }
  componentWillUnMount() {
    //clean up ipcRenderer listener
    ipcRenderer.removeAllListeners(['get-packages-reply', 'search-packages-reply']);
  }
  deselectAll() {
    let list = this.refs.list;
    if (list) {
      let selected = list.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
    }
  }
  render() {
    let packages = this.props.packages;
    return (
      <Loader loading={this.props.loading}>
        <div className={styles.packages__list} ref="list">
          {(packages)
            ? packages.map((pkg, idx) => {
              let hasPeerMissing = pkg.peerMissing;
              if (hasPeerMissing) {
                return;
              }
              let version = pkg.version;
              let name = (pkg.from)
                ? pkg.from.split("@")[0]
                : pkg.name;
              return <PackageListItem deselectAll={this.deselectAll} idx={idx} key={idx} name={name} version={version}/>
            })
            : null}
        </div>
      </Loader>
    )
  }
}

export default PackagesList;
