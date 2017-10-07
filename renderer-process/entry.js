import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Bootstrap from 'bootstrap/dist/js/bootstrap.js';
import {HashRouter as Router, Route} from 'react-router-dom';

const rootEl = document.getElementById('app');

ReactDOM.render(
  <Router><App/></Router>, rootEl);
