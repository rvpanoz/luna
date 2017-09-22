/**
 * Main component
 * Routes of the app are defined in this component
 */

import React from 'react';
import {Route} from 'react-router-dom';
import List from './List';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <Route exact path='/' render={(props) => {
          return <List onLoad={this.onLoad}/>
        }}/>
    </div>
    )
  }
}
