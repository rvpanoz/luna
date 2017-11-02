import React from 'react';
import {loadData} from '../../utils';
import Switch from 'react-toggle-switch'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this._setMode = this._setMode.bind(this);
  }
  _setMode(e) {
    switch (this.props.mode) {
      case 'GLOBAL':
        return;
      default:
        this.props.setMode('GLOBAL');
        this.props.toggleLoader(true);
        this.props.clearMessages();
        this.props.setActive(null);
        loadData();
    }
  }
  render() {
    return (
      <section className="sidebar__settings">
        <div className="sidebar__title">
          Settings
        </div>
        <div className="ss-widget">
          <div className="ss-widget__cont">
            <div className="ss-widget__row">
              <div className="ss-widget__cell">Global mode</div>
              <div className="ss-widget__cell">
                <Switch className="switch" onClick={this._setMode} on={(this.props.mode==='GLOBAL')}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Settings
