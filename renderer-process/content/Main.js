/**
 * Main component
 * Routes of the app are defined in this component
 */

import React from 'react';
import {Route} from 'react-router-dom';
import Sidebar from './../common/Sidebar';
import Home from './Home';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main-content">
        <Sidebar />
        <Route exact path='/' render={(props) => {
          return <Home />
        }}/>
    </div>
    )
  }
}
