import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import PackageListItem from './PackagesListItem';
import styles from './Packages.css';

class PackagesList extends React.Component {
  constructor(props) {
    super(props);
    this.deselectAll = this.deselectAll.bind(this);
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
  componentDidMount() {
    let list = this.refs.list;
    list.style['max-height'] = (window.innerHeight - 200) + "px";
    this.props.toggleLoader(true);
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
              let readme = pkg.readme;
              let name = (pkg.from)
                ? pkg.from.split("@")[0]
                : pkg.name;
              return <PackageListItem
                      toggleMainLoader={this.props.toggleMainLoader}
                      deselectAll={this.deselectAll}
                      idx={idx} key={idx}
                      name={name}
                      readme={readme}
                      description={(pkg.description) ? pkg.description : null}
                      version={version}/>
            })
            : null}
        </div>
      </Loader>
    )
  }
}

export default PackagesList;
