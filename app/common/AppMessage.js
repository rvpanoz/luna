import React from 'react';

class AppMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let show = this.props.show;
    let message = this.props.appMessage;

    if(!show) {
      return null;
    }

    let open_cls = (show) ? 'app__message_open' : '';
    return (
      <div className={`app__message ${open_cls}`} ref="root">
        <span className="app__message__label red">{message}</span>
      </div>
    )
  }
}

export default AppMessage
