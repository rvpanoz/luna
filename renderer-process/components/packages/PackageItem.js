import {remote, ipcRenderer} from 'electron';
import React from 'react';

const PackageItem = (props) => (
  <div className="packages-item new">
    <div className="packages-item__head">
      <div className="packages-item__check">
        <div className="checkbox">
          <input id={`m`+props.idx} type="checkbox"/>
          <label htmlFor={`m`+props.idx}></label>
        </div>
      </div>
      <div className="packages-item__name">
        <span>{props.name}</span>
      </div>
      <div className="packages-item__date">
        <span>{props.version}</span>
      </div>
    </div>
  </div>
)

export default PackageItem
