import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import PackageItem from './PackageItem';

const listeners = ['get-packages-reply', 'search-packages-reply', 'view-by-version-reply'];

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
    this.deSelectAll = this.deSelectAll.bind(this);
  }
  componentWillMount() {
    ipcRenderer.send('get-packages', {scope: 'g'});
  }
  componentDidMount() {
    this.props.toggleLoader(true);
    ipcRenderer.on('get-packages-reply', (event, packages) => {
      this.props.setPackages(packages);
      this.props.toggleLoader(false);
    });
    ipcRenderer.on('search-packages-close', (event, packages) => {
      this.props.setPackages(packages);
      this.props.toggleLoader(false);
    });
    ipcRenderer.on('view-by-version-reply', (event, pkg) => {
      this.props.setActive(pkg);
    });
  }
  componentWillUnMount() {
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
    return (
      <Loader loading={this.props.loading}>
        <div className="packages_list" ref="list">
          {(packages)
            ? packages.map((pkg, idx) => {
              pkg.name = (pkg.from)
                ? pkg.from.split("@")[0]
                : pkg.name;
              return <PackageItem deselect={this.deSelectAll} idx={idx} key={idx} {...pkg}/>
            })
            : null}
        </div>
      </Loader>
    )
  }
}

export default PackagesList;
