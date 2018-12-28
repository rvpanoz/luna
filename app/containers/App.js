/* eslint-disable */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { withErrorBoundary } from 'commons/hocs';
import Layout from './Layout';

import '../app.global.css';

const App = () => {
  console.log('app rendered');

  useEffect(() => {
    console.log('app useEffect 1');
    ipcRenderer.on('uncaught-exception', (event, exceptionError) => {
      console.error('uncaught-exception', exceptionError);
    });

    ipcRenderer.on('ipcEvent-flow', (event, error, data) => {
      //TODO: do something with the data stream..
    });

    return () =>
      ipcRenderer.removeAllListeners(['uncaught-exception', 'ipcEvent-error']);
  });

  return (
    <div id="app">
      <Layout />
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
