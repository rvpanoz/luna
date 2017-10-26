import React from 'react';

class OutdatedListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let el = this.refs.root;
    if (el) {
      el.classList.add('fadeIn');
    }
  }
  render() {
    let pkg = this.props.package;
    return (
      <div className="outdated__item outdated__item_user animated" ref="root">
        <div className="outdated__ico">
          <i className="fa fa-fw"></i>
        </div>
        <div className="outdated__info">
          <div className="outdated__text">
            <div className="fl">
              <span className="label label-danger">Latest:&nbsp;{pkg.details.latest}</span>
            </div>
            <div className="fr">
              <a href="#">{pkg.name}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OutdatedListItem;
