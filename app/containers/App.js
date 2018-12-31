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
    ipcRenderer.once('uncaught-exception', (event, exceptionError) => {
      console.error('uncaught-exception', exceptionError);
    });

    return () => ipcRenderer.removeAllListeners(['uncaught-exception']);
  });

  return (
    <div id="app">
      <Layout app="Luna" />
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
