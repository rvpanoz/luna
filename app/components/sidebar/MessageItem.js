import React from 'react';

class AppMessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  _parse(errorMsg, idx) {
    let errorArr = errorMsg.split(':');
    return errorArr[idx];
  }
  close() {
    let el = this.refs.root;
    if (el) {
      el.classList.remove('fadeIn');
      el.classList.add('fadeOut');
    }
    return false;
  }
  componentDidMount() {
    let el = this.refs.root;
    if (el) {
      el.classList.add('fadeIn');
    }
  }
  render() {
    let message = this.props.message;
    return (
      <div className="messages__item animated" ref="root">
        <div className="messages__title" style={{marginBottom: '5px'}}>
          <i className="fa fa-fw fa-tag tag_clients"></i>
          <span className="red">{this._parse(message.body, 0)}</span>
        </div>
        <div className="messages__text">{this._parse(message.body, 1)}</div>
        <a className="messages__link" href="#"></a>
      </div>
    )
  }
}

export default AppMessageItem;
