'use strict';

import React from 'react';
import { remote, ipcRenderer } from 'electron';
import { showMessageBox } from '../../utils';
import { COMMAND_OPTIONS } from '../../constants/AppConstants';

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
  }
  _checkGroup(option) {
    let group = this.props.group, check = false;
    if(group && typeof group === 'string') {
      switch (group) {
        case 'devDependencies':
          check = (option === 'save-dev');
          break;
        case 'optionalDependencies':
          check = (option === 'save-optional');
          break;
        default:
          check = (option === 'save');
      }
    }
    return check;
  }
  componentDidUpdate(props) {
    let group = props.group;
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
            (!(props.mode === 'GLOBAL')) ? COMMAND_OPTIONS.map((option, idx) => {
              let opt = option.split('*');
              return (<li key={idx} title={opt[1]}>
                <div className="form-check abc-checkbox">
                  <input className="form-check-input" defaultChecked={this._checkGroup(opt[0])} id={`m${idx}`} type="checkbox" data-option={opt[0]}/>
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
