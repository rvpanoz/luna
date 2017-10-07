import { remote, ipcRenderer} from 'electron';
import React from 'react';
import { StaticList } from '../../common/Statics';
import { showMessageBox } from '../../../utils';

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
  }
  update(e) {
    e.preventDefault();
    let pkg = this.props.pkg;

    showMessageBox({
      action: 'update',
      name: pkg.name
    }, () => {
      ipcRenderer.send('update-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
      this.setState({loader: true});
    });
  }
  uninstall(e) {
    e.preventDefault();
    let pkg = this.props.pkg;

    showMessageBox({
      action: 'uninstall',
      name: pkg.name,
    }, () => {
      ipcRenderer.send('uninstall-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
      this.setState({loader: true});
    });
  }
  install(e) {
    if (e) {
      e.preventDefault();
    }
    let version = this.refs.selectVersion.value;
    if (version != '0') {
      let pkg = this.props.pkg;
      showMessageBox({
        action: 'install',
        name: pkg.name,
        version: version
      }, () => {
        ipcRenderer.send('install-by-version', {
          pkgName: pkg.name,
          pkgVersion: version
        });
        this.setState({loader: true});
      });
    }
    return false;
  }
  render() {
    let pkg = this.props.pkg;
    if (!pkg) {
      return null;
    }
    return (
      <div className="package-details">
        <div className="package-details__head">
          <div className="package-details__title">
            {pkg.name}&nbsp;v{pkg.version}
          </div>
          <div className="package-details__settings dropdown">
            <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a href="#">
                  <i className="fa fa-fw fa-reply"></i>
                  <span>Update</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={this.uninstall}>
                  <i className="fa fa-fw fa-trash"></i>
                  <span>Uninstall</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="package-details__info">
          <div className="package-details__name">
            <span>Author:&nbsp;{pkg.author}</span>
            <br/>
            <span>Latest:&nbsp;v{pkg['dist-tags'].latest}</span>
            <br/>
            <span>License:&nbsp;{pkg.license}</span>
          </div>
          <div className="package-details__date">

          </div>
        </div>
        <div className="package-details__body">
          <div className="package-details__text">{pkg.description}</div>
            <div className="package-details__tabs tab-wrap">
              <input id="tab1" type="radio" name="tabs" defaultChecked/>
              <label htmlFor="tab1">Dependencies</label>
              <input id="tab2" type="radio" name="tabs"/>
              <label htmlFor="tab2">Contributors</label>
              <section id="dependencies-content">
                <StaticList data={pkg.dependencies}/>
              </section>
              <section id="contributors-content">
                <StaticList data={pkg.maintainers}/>
              </section>
            </div>
        </div>
      </div>
    )
  }
}

export default PackageDetails;
