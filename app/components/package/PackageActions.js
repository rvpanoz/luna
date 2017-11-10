'use strict';

import React from 'react';
import {remote, ipcRenderer} from 'electron';
import {showMessageBox} from '../../utils';
import {OPTIONS} from '../../constants/Command';

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let dp = this.refs.dropdownMenu;
    if(dp) {
      dp.addEventListener('click', (e) => {
        let target = e.target;
        if(target.tagName === 'LABEL' || target.tagName === 'INPUT') {
          e.stopPropagation();
          if (target.dataset.option) {
            let option = target.dataset.option;
            this.props.addCommandOption(option);
          }
          return false;
        }
      });
    }
  }
  componentWillUnMount() {
    let dp = this.refs.dropdownMenu;
    if(dp) {
      dp.removeEventListener('click');
    }
  }
  render() {
    let props = this.props;
    let modeGlobal = props.mode === 'GLOBAL';
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
          <li className="dropdown-header" style={{display: (modeGlobal) ? 'none' : 'inherit'}}>Options</li>
          {
            (!modeGlobal) ? OPTIONS.map((option, idx) => {
              let opt = option.split('*');
              return (<li key={idx} title={opt[1]}>
                <div className="form-check abc-checkbox">
                  <input className="form-check-input" id={`m${idx}`} type="checkbox" data-option={opt[0]}/>
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
