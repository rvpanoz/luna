import React from 'react';

class PackageHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pkg = this.props.pkg;
    if(!pkg) {
      return null;
    }
    return (
      <div className="flex-row" ref="root">
        <h1 className="ui header" style={{
          marginBottom: '0.25em'
        }}>
          {pkg.name}&nbsp;{pkg.version}
          <div className="sub header">
            Latest:&nbsp;{pkg['dist-tags'].latest}
          </div>
        </h1>
      </div>
    )
  }
}

export default PackageHeader;
