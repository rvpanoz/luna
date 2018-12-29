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
  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, exceptionError) => {
      console.error('uncaught-exception', exceptionError);
    });

    ipcRenderer.on('ipcEvent-flow', (event, error, data) => {
      //TODO: do something with the data stream..
    });

    return () =>
      ipcRenderer.removeAllListeners(['uncaught-exception', 'ipcEvent-flow']);
  });

  return (
    <div id="app">
      <Layout app="Luna" />
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
