/**
 * App Component
 *
 */

import {remote, ipcRenderer} from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';
import {HashRouter as Router} from 'react-router-dom';

//configuration and store globals
const config = remote.getGlobal('config');
const store = remote.getGlobal('store');

//app components
import Main from './content/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="wrapper">
        <Main />
      </div>
    )
  }
}

// https://github.com/reactjs/react-router-tutorial/tree/master/lessons/12-navigating
App.contextTypes = {
  router: PropTypes.object
};

ReactDOM.render(
  <Router><App/></Router>, document.getElementById('app-content'));
