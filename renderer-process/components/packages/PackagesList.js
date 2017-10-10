import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import PackageListItem from './PackageListItem';

const listeners = [
  'get-packages-reply',
  'search-packages-reply',
  'view-by-version-reply'
];

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
    this.deSelectAll = this.deSelectAll.bind(this);
  }
  componentWillMount() {
    //get installed packages
    ipcRenderer.send('get-packages', {scope: 'g'});
  }
  componentDidMount() {
    //toggle loader
    this.props.toggleLoader(true);

    //ipcRenderer listeners
    ipcRenderer.on('get-packages-close', (event, packages) => {
      this.props.setPackages(packages);
    });
    ipcRenderer.on('search-packages-close', (event, packages) => {
      this.props.setPackages(packages);
    });
    ipcRenderer.on('view-by-version-reply', (event, pkg) => {
      this.props.setActive(pkg);
    });
  }
  componentWillUnMount() {
    //clean up
    ipcRenderer.removeAllListeners(listeners);
  }
  deSelectAll() {
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
    let peerDeps = {};
    return (
      <Loader loading={this.props.loading}>
        <div className="packages_list" ref="list">
          {(packages)
            ? packages.map((pkg, idx) => {
              let hasPeerMissing = pkg.peerMissing;
              if(hasPeerMissing) {
                return;
              }
              let version = pkg.version;
              let name = (pkg.from) ? pkg.from.split("@")[0] : pkg.name;
              return <PackageListItem
                      deselect={this.deSelectAll}
                      idx={idx}
                      key={idx}
                      name={name}
                      version={version}
                     />
            })
            : null}
        </div>
      </Loader>
    )
  }
}

export default PackagesList;
