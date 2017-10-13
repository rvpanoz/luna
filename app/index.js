import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Bootstrap from 'bootstrap/dist/js/bootstrap.js';
import {HashRouter as Router, Route} from 'react-router-dom';

const rootEl = document.getElementById('app-content');

ReactDOM.render(
  <Router><App/></Router>, rootEl);
