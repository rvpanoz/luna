'use strict';

import {remote, ipcRenderer} from 'electron';
import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    let element = $(e.target);
    let actions = $(this.itemActions);

    this.props.clearSelection();
    element.closest('tr').addClass('selected');
    actions.addClass('show').css({
      height: '35px'
    });

    ipcRenderer.send('get-package-info', this.props);
  }
  render() {
    return (
      <tr onClick={this.onItemClick} ref={`root-${this.props.idx}`} style={{cursor: 'pointer'}}>
        <td>
          <div className="flex-column">
            <div className="flex-row">
              <a href="#">{this.props.name}</a>
            </div>
          </div>
        </td>
        <td style={{
          textAlign: 'right'
        }}>
        <span className="badge badge-green version">
          v{this.props.info.version}
        </span>
        </td>
      </tr>
    )
  }
}
