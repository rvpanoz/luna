/**
 * Main component
 * Routes of the app are defined in this component
 */

import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="content">
        <div className="content__middle">
          <Route exact path='/' render={(props) => {
            return <Home />
          }}/>
        </div>
      </section>
    )
  }
}
