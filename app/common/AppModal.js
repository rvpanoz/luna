import {remote, ipcRenderer} from 'electron';
import React from 'react';

class AppModal extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let rootEl = this.refs.root;
    if(rootEl) {
      $(rootEl).modal({
        backdrop: false,
        show: this.props.showModal
      });
      ipcRenderer.on('ipcEvent-error', (event, errorMessage) => {
        let messageEl = this.refs.message;
        messageEl.innerHTML+="<br/>" + errorMessage;
      });
    }
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners(['ipcEvent-error']);
  }
  render() {
    return (
      <div className="modal fade" ref="root">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" type="button">
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger" role="alert" ref="message">

              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-default" type="button">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppModal
