/**
 * Main component
 * Routes of the app are defined in this component
 */

import React from 'react';
import {Route} from 'react-router-dom';
import AppLoader from './../common/AppLoader';
import List from './List';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    }
    this.onLoad = this.onLoad.bind(this);
  }
  onLoad(loader) {
    this.setState({
      loader: loader
    });
  }
  render() {
    return (
      <div className="main-content">
        <AppLoader isVisible={this.state.loader} />
        <Route exact path='/' render={(props) => {
          return <List onLoad={this.onLoad}/>
        }}/>
    </div>
    )
  }
}
