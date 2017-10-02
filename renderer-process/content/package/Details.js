import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pkg = this.props.pkg;
    return (
      <div className="package-details">
        <div className="author">
          Author:&nbsp;{pkg.author}
        </div>
        <div className="detail-description">
          {pkg.description}
        </div>
      </div>
    )
  }
}
