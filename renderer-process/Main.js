/**
 * Main component
 * in this component we render app routes
 */

import React from 'react';
import {Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import Settings from './pages/Settings';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/packages' component={Packages}/>
        <Route path='/settings' component={Settings}/>
      </main>
    )
  }
}
