import {remote, ipcRenderer} from 'electron';
import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      has_update: false,
      latest_version: false
    }
    this.onItemClick = this.onItemClick.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }
  onItemClick(e) {
    e.preventDefault();
    this.getInfo();
    return false;
  }
  getInfo(e) {
    ipcRenderer.send('get-package-info', this.props);
  }
  componentWillMount() {
    ipcRenderer.send('get-latest-version', this.props);
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('get-global-modules-reply');
  }
  render() {
    return (
      <tr ref={`root-${this.props.idx}`}>
        <td>
          <a onClick={this.onItemClick} href="#">{this.props.name}</a>
        </td>
        <td style={{
          textAlign: 'right'
        }}>
          {this.props.info.version}
        </td>
      </tr>
    )
  }
}
