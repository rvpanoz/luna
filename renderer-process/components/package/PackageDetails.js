import {remote, ipcRenderer} from 'electron';
import React from 'react';
import Loader from '../../common/Loader';
import {StaticList} from '../../common/Statics';
import {showMessageBox} from '../../../utils';

const actions = ['Install', 'Uninstall', 'Update'];

const Action = (props) => {
  return (
    <li>
      <a href="#" onClick={props.doAction}>
        <span>{props.action}</span>
      </a>
    </li>
  )
}

const Actions = (props) => {
  return (
    <ul className="dropdown-menu dropdown-menu-right">
      {props.modeActions.map((action, idx) => {
        return <Action doAction={props.doAction} action={action} key={idx}/>
      })}
    </ul>
  )
}

class PackageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.install = this.install.bind(this);
    this.update = this.update.bind(this);
    this.uninstall = this.uninstall.bind(this);
    this.doAction = this.doAction.bind(this);
  }
  doAction(e) {
    e.preventDefault();
    let target = e.currentTarget;
    let action = target.querySelector('span').innerHTML.toLowerCase();
    if(this[action]) {
      this[action]();
    }
    return false;
  }
  update() {
    let pkg = this.props.pkg;

    showMessageBox({
      action: 'UPDATE',
      name: pkg.name
    }, () => {
      ipcRenderer.send('update-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
      this.props.toggleMainLoader(true)
    });
  }
  uninstall() {
    let pkg = this.props.pkg;

    showMessageBox({
      action: 'UNINSTALL',
      name: pkg.name
    }, () => {
      ipcRenderer.send('uninstall-package', {
        pkgName: pkg.name,
        scope: 'g'
      });
      this.props.toggleMainLoader(true);
    });
  }
  install() {
    let version = this.refs.selectVersion.value;
    if (version != '0') {
      let pkg = this.props.pkg;
      showMessageBox({
        action: 'INSTALL',
        name: pkg.name,
        version: version
      }, () => {
        ipcRenderer.send('install-by-version', {
          pkgName: pkg.name,
          pkgVersion: version
        });
        this.props.toggleMainLoader(true)
      });
    }
    return false;
  }
  componentDidMount() {
    ipcRenderer.on('uninstall-package-reply', (event) => {
      this.props.toggleMainLoader(false);
      this.props.setActive(null);
    });
  }
  render() {
    let pkg = this.props.pkg;
    if (!pkg) {
      return null;
    }
    return (
      <div className="package-details" ref="root">
        <Loader loading={this.props.package_loading}>
          <div className="package-details__head">
            <div className="package-details__title">
              {pkg.name}&nbsp;v{pkg.version}
            </div>
            <div className="package-details__settings dropdown">
              <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
              <Actions modeActions={this.props.modeActions} doAction={this.doAction}/>
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
            <div className="package-details__date"></div>
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
        </Loader>
      </div>
    )
  }
}

export default PackageDetails;
