import {remote, ipcRenderer} from 'electron';
import React from 'react';
import {parse} from './../../../utils';

export default class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInstalled: false,
      actionText: 'Install'
    }
    this.updateUI = this.updateUI.bind(this);
  }
  componentDidMount() {
    let root = this.refs.root;
    if(root) {
      ipcRenderer.on('get-package-reply', (event, data) => {
        this.updateUI(parse(data, 'dependencies'));
      });
    }
  }
  updateUI(data) {
    let root = this.refs.root;
    let isInstalled = data.length;
    if (root) {
      this.setState({
        actionText: (isInstalled) ? 'Uninstall' : 'Install'
      });
    }
  }
  render() {
    return (
      <div className="ui-actions" ref="root">
        <a href="#" onClick={this.props.onClick}>{this.state.actionText}</a>
      </div>
    )
  }
}
