import {remote, ipcRenderer} from 'electron';
import React from 'react';

const PackageItem = (props) => (
  <div className="item">
    <div className="flex-row">
      <a href="#" onClick={(e) => {
          let target = e.target;
          props.deSelectAll();
          target.classList.add('selected');
          ipcRenderer.send('view-by-version', {
            pkgName: props.name,
            pkgVersion: props.version
          });
        }}>
      {props.name}
      </a>
      <span style={{
        width: '20%',
        height: '15px'
      }}>{props.version}</span>
    </div>
  </div>
)

export default PackageItem
