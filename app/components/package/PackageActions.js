/**
* Package actions inner component
**/

'use strict';

import React from 'react';
import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../utils';
import { APP_MODES, PACKAGE_GROUPS, COMMAND_OPTIONS } from '../../constants/AppConstants';

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
    this._setupUI = this._setupUI.bind(this);
  }
  _setupUI() {
    let mode = this.props.mode;
    let pkg = this.props.active;

    if(pkg && mode === APP_MODES.LOCAL) {
      let packageJSON = this.props.packageJSON;

      //clear command options
      this.props.clearCommandOptions();

      PACKAGE_GROUPS.forEach((groupName, idx) => {
        if(packageJSON[groupName] && packageJSON[groupName][pkg.name]) {
          switch (groupName) {
            case 'dependencies':
              this.props.addCommandOption('save');
              this.refs['opt-save'].checked = true;
              break;
            case 'devDependencies':
              this.props.addCommandOption('save-dev');
              this.refs['opt-save-dev'].checked = true;
            case 'optionalDependencies':
              this.props.addCommandOption('save-optional');
              this.refs['opt-save-optional'].checked = true;
            default:

          }
        }
      });
    }
  }
  componentDidMount() {
    let dp = this.refs.dropdownMenu;
    if(dp) {
      dp.addEventListener('click', (e) => {
        let target = e.target;
        if(target.tagName === 'LABEL' || target.tagName === 'INPUT') {
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
    if(dp) {
      dp.removeEventListener('click');
      dp.removeEventListener('change');
    }
  }
  render() {
    let props = this.props;
    let actions = props.packageActions;

    return (
      <div className="dropdown">
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
          <li className="dropdown-header" style={{display: (props.mode === 'GLOBAL') ? 'none' : 'inherit'}}>Options</li>
          {
            (!(props.mode === APP_MODES.GLOBAL)) ? COMMAND_OPTIONS.map((option, idx) => {
              let opt = option.split('*');
              return (<li key={idx} title={opt[1]}>
                <div className="form-check abc-checkbox">
                  <input className="form-check-input"
                    id={`m${idx}`} type="checkbox"
                    ref={`opt-${opt[0]}`}
                    data-option={opt[0]}/>
                  <label className="form-check-label" htmlFor={`m${idx}`}>
                    {opt[0]}
                  </label>
                </div>
              </li>)
            }) : null
          }
        </ul>
      </div>
    )
  }
}

export default PackageActions;
