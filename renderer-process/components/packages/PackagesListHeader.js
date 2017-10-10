import React from 'react';
import { remote, ipcRenderer} from 'electron';

class PackagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    this._reload = this._reload.bind(this);
  }
  _reload(e) {
    this.props.toggleLoader(true);
    this.props.setAppMessage(null);
    this.props.setActive(null);
    ipcRenderer.send('get-packages', {
      scope: 'g'
    });
  }
  render() {
    let props = this.props;
    return (
      <div className="packages__head">
        <div className="packages__title">
          <span>{props.title}</span>
        </div>
        <div className="packages__actions">
          <div className="packages__action">
            <i className="fa fa-fw fa-refresh" onClick={this._reload} title="Reload"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default PackagesListHeader;
