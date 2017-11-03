'use strict';

import React from 'react';
import {remote, ipcRenderer} from 'electron';
import {showMessageBox} from '../../utils';

class PackageActions extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    let actions = props.packageActions;

    return (
      <div className="dropdown">
        <i className="fa fa-fw fa-cog dropdown-toggle" data-toggle="dropdown"></i>
        <ul className="dropdown-menu dropdown-menu-right">
          <li className="dropdown-header">Do action</li>
          {
            actions.map((action, idx)=>{
              return (
                <li key={idx}>
                  <a href="#" data-action={action.text} onClick={props.doAction}>
                    <i className={`fa fa-${action.iconCls}`} />&nbsp;
                    <b>{action.text}</b>
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
