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
      <div className="messages__item animated" ref="root">
        <div className="messages__title"></div>
        <div className="messages__text">
          {message.body}
        </div>
      </div>
    )
  }
}

export default AppMessageItem;
