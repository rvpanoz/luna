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

    ipcRenderer.on('ipcEvent-error', (event, error) => {
      console.error(error, 1);
      // TODO: dispatch addNotification.type
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
