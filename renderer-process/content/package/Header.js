'use strict';

import React from 'react';
import ActionButton from './ActionButton';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pkg = this.props.pkg;

    return (
      <div className="flex-row" ref="root">
        <h1 className="ui header" style={{
          marginBottom: '0.25em'
        }}>
          {pkg.name}&nbsp;{pkg.version}
          <div className="sub header">
            Latest:&nbsp;{pkg['dist-tags'].latest}&nbsp; {(this.props.needsUpdate())
              ? <a href="#" onClick={this.props.update}>Update</a>
              : ''}
          </div>
        </h1>
        <ActionButton />
      </div>
    )
  }
}
