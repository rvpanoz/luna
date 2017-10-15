import React from 'react';

class AppMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(props) {
    console.log(props);
    let root = this.refs.root;
    if(root && props.open) {
      root.classList.add('app__message__open');
    }
  }
  render() {
    let open = this.props.open;
    let message = this.props.message;

    if(!open && !message) {
      return null;
    }
    return (
      <div className="app__message" ref="root">
        {message}
      </div>
    )
  }
}

export default AppMessage
