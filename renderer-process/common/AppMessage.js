import React from 'react';

export default class AppMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app-message" style={{paddingTop: '15px'}}>
        <strong>{this.props.messageType}&nbsp;</strong>{this.props.message}
      </div>
    )
  }
}
