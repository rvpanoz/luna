import React from 'react';

class AppMessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  close() {
    let el = this.refs.root;
    if(el) {
      el.classList.remove('fadeIn');
      el.classList.add('fadeOut');
    }
    return false;
  }
  componentDidMount() {
    let el = this.refs.root;
    if(el) {
      el.classList.add('fadeIn');
    }
  }
  render() {
    let message = this.props.message;
    return (
      <div className="message message--red animated" ref="root">
        <div className="message-icon" style={{display: 'none'}}>
          <i className="fa fa-times"></i>
        </div>
        <div className="message-body">
          <p>{message.body}</p>
          <button onClick={this.close} className="message-button js-messageClose">Don't care.</button>
        </div>
        <button className="message-close js-messageClose">
          <i className="fa fa-times"></i>
        </button>
      </div>
    )
  }
}

export default AppMessageItem;
