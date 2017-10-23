import React from 'react';

class OutdatedListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let el = this.refs.root;
    if(el) {
      el.classList.add('fadeIn');
    }
  }
  render() {
    let pkg = this.props.package;
    return (
      <div className="outdated__item animated" ref="root">
        <div className="outdated__title"></div>
        <div className="outdated__text">
          {pkg.name}
        </div>
      </div>
    )
  }
}

export default OutdatedListItem;
