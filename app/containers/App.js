/* eslint-disable */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import Layout from './Layout';

import { commandError } from 'models/app/actions';
import '../app.global.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, ...args) => {
      console.error('uncaught-exception', args);
    });

    ipcRenderer.on('ipcEvent-error', (event, error) => {
      dispatch(
        commandError({
          error
        })
      );
    });

    return () =>
      ipcRenderer.removeAllListeners(['ipcEvent-error', 'uncaught-exception']);
  });

  return (
    <div id="app">
      <Layout app="Luna" />
    </div>
  );
};

const WithErrorBoundaryApp = withErrorBoundary(App);
export default WithErrorBoundaryApp;
