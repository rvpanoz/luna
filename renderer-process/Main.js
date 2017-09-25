/**
 * Main component
 * in this component we render app routes
 */

'use strict';

import React from 'react';
import {Route} from 'react-router-dom';
import Packages from './pages/Packages';
import Settings from './pages/Settings';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Route path='/' component={Packages}/>
        <Route path='/settings' component={Settings}/>
      </main>
    )
  }
}
