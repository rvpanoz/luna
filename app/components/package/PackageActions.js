/**
* Package actions inner component
**/

'use strict';

import React from 'react';
import { remote, ipcRenderer} from 'electron';
import { showMessageBox} from '../../utils';
import { APP_MODES, PACKAGE_GROUPS, COMMAND_OPTIONS } from '../../constants/AppConstants';

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
    this._setupUI = this._setupUI.bind(this);
  }
  _setupUI() {
    let mode = this.props.mode;
    let pkg = this.props.active;
    let packageGroup = null;

    if (pkg && mode === APP_MODES.LOCAL) {
      let packageJSON = this.props.packageJSON;

      //update state (glbal.cmdOptions)
      this.props.clearCommandOptions();

      //update UI values
      this.refs['opt-save'].checked = false;
      this.refs['opt-save-dev'].checked = false;
      this.refs['opt-save-optional'].checked = false;

      //is in a group? (dependencies, devDependencies etc)
      let group = PACKAGE_GROUPS.some((groupName, dix) => {
        if (packageJSON[groupName] && packageJSON[groupName][pkg.name]) {
          packageGroup = groupName;
          return true;
        }
      });

      if(!packageGroup) {
        return false;
      }

      // clear options
      this.props.clearCommandOptions();

      switch (packageGroup) {
        case 'dependencies':
          this.props.addCommandOption('save');
          this.refs['opt-save'].checked = true;
          break;
        case 'devDependencies':
          this.props.addCommandOption('save-dev');
          this.refs['opt-save-dev'].checked = true;
          break;
        case 'optionalDependencies':
          this.props.addCommandOption('save-optional');
          this.refs['opt-save-optional'].checked = true;
          break;
        default:
          this.refs['opt-save'].checked = false;
          this.refs['opt-save-dev'].checked = false;
          this.refs['opt-save-optional'].checked = false;
      }
      
      // save-exact fix
      let groupDependencies = packageJSON[packageGroup];
      let version = groupDependencies[pkg.name];

      if(!isNaN(version.charAt(0))) {
        this.props.addCommandOption('save-exact');
        this.refs['opt-save-exact'].checked = true;
      } else {
        this.refs['opt-save-exact'].checked = false;
      }
    }
  }
  componentDidMount() {
    let dp = this.refs.dropdownMenu;
    if (dp) {
      dp.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName === 'LABEL' || target.tagName === 'INPUT') {
          e.stopPropagation();
        }
      });

      dp.addEventListener('change', (e) => {
        let target = e.target;
        if (target.dataset.option) {
          let option = target.dataset.option;
          this.props.addCommandOption(option);
        }
      });
    }

    this._setupUI();
  }
  componentWillUnMount() {
    let dp = this.refs.dropdownMenu;
    if (dp) {
      dp.removeEventListener('click');
      dp.removeEventListener('change');
    }
  }
  render() {
    let props = this.props;
    let actions = props.packageActions;

    return (<div className="dropdown">
      <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
      <ul className="dropdown-menu dropdown-menu-right" ref="dropdownMenu">
        <li className="dropdown-header">Actions</li>
        {
          actions.map((action, idx) => {
            return (<li key={idx}>
              <a href="#" data-action={action.text} onClick={props.doAction}>
                <i className={`fa fa-${action.iconCls}`}/>&nbsp;
                <b>{action.text}</b>
              </a>
            </li>)
          })
        }
        <li className="dropdown-header" style={{
            display: (props.mode === 'GLOBAL')
              ? 'none'
              : 'inherit'
          }}>Options</li>
        {
          (!(props.mode === APP_MODES.GLOBAL))
            ? COMMAND_OPTIONS.map((option, idx) => {
              let opt = option.split('*');
              return (<li key={idx} title={opt[1]}>
                <div className="form-check abc-checkbox">
                  <input className="form-check-input" id={`m${idx}`} type="checkbox" ref={`opt-${opt[0]}`} data-option={opt[0]}/>
                  <label className="form-check-label" htmlFor={`m${idx}`}>
                    {opt[0]}
                  </label>
                </div>
              </li>)
            })
            : null
        }
      </ul>
    </div>)
  }
}

export default PackageActions;
