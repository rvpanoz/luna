/* eslint-disable */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import { withErrorBoundary } from 'commons/hocs';
import Layout from './Layout';

import '../app.global.css';

console.clear();

const App = () => {
  console.log('App render');
  const [counter, setCounter] = useState(0);

  useEffect(
    () => {
      console.log('App useEffect');
      ipcRenderer.once('uncaught-exception', (event, exceptionError) => {
        console.error('uncaught-exception', exceptionError);
      });

      return () => ipcRenderer.removeAllListeners(['uncaught-exception']);
    },
    [counter]
  );

  return (
    <div id="app">
      <Layout app="Luna" />
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
