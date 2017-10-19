import React from 'react';
import AppMessageItem from './AppMessageItem';

export default class AppMessages extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let messages = this.props.messages;
    return (
      <div className="messages">
        { (messages) ? messages.map((msg, idx) => {
          return <AppMessageItem key={idx} message={msg}/>
        }) : null
        }
      </div>
    )
  }
}
