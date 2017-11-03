import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props)
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
              <div className="ss-widget__cell"></div>
              <div className="ss-widget__cell"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Settings
