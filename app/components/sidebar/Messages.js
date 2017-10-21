import React from 'react';
import MessageItem from './MessageItem';

export default class Messages extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let messages = this.props.messages;
    return (
      <section className="sidebar__messages">
        <div className="sidebar__title">
          Messages
        </div>
        <div className="messages">
          <div className="messages__list">
          { (messages) ? messages.map((msg, idx) => {
            return <MessageItem key={idx} message={msg}/>
          }) : null
          }
        </div>
        </div>
      </section>
    )
  }
}
