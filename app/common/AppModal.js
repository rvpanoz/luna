import {remote, ipcRenderer} from 'electron';
import React from 'react';

class AppModal extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    ipcRenderer.on('ipcEvent-error', (event, errorMessage) => {
      console.log(errorMessage);
    });
  }
  componentWillUnMount() {
    ipcRenderer.removeAllListeners(['ipcEvent-error']);
  }
  componentDidUpdate(props) {
    let root = this.refs.root;
    if(root) {
      console.log(props.isVisible);
      $(root).modal((props.isVisible === true ? 'show' : 'hide'));
    }
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
              <h4 className="modal-title">Title</h4>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger" role="alert">
                Messages goes here...
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
