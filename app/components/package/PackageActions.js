import React from 'react';
import {showMessageBox, capitalizeFirst} from '../../utils';

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
    this.doAction = this.doAction.bind(this);
  }
  doAction(e) {
    e.preventDefault();

    let target = e.currentTarget;
    let action = target.dataset.action.toLowerCase();

    if (action && typeof action === 'string') {
      let active = this.props.active;
      let selectVersion = this.refs.selectVersion;
      let version = (selectVersion && selectVersion.value !== "false")
        ? selectVersion.value
        : 'latest';

      showMessageBox({
          action: capitalizeFirst(action),
          name: active.name,
          version: version
        }, () => {
          this.props.setActive(null);
          this.props.toggleMainLoader(true);
          ipcRenderer.send('ipc-event', {
            ipcEvent: action,
            cmd: [(action === 'uninstall') ? 'uninstall' : 'install'],
            pkgName: active.name,
            pkgVersion: (action === 'uninstall') ? null : version,
            params: ['g']
          });
        });
    }
    return false;
  }
  render() {
    let actions = this.props.actions;
    return (
      <div className="dropdown">
        <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
        <ul className="dropdown-menu dropdown-menu-right">
          <li className="dropdown-header">Do action</li>
          {
            actions.map((action, idx)=>{
              return (
                <li key={idx}>
                  <a href="#" data-action={action} onClick={this.doAction}>
                    <b>{action}</b>
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default PackageActions;
