/* eslint-disable */

/**
 * App with error boundary
 */

import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { withErrorBoundary } from 'commons/hocs';
import Layout from './Layout';

import { parseNpmError } from 'commons/utils';
import { addNotification } from 'models/ui/actions';

import '../app.global.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, exceptionError) => {
      console.error('uncaught-exception', exceptionError);
    });

    ipcRenderer.on(
      'get-packages-close',
      (event, status, commandArgs, data, error) => {
        console.log(error);
        const [body, requires, requiredBy] = parseNpmError(error);

        if (!body) {
          return;
        }

        dispatch(
          addNotification({
            level: 0,
            body,
            requires,
            requiredBy
          })
        );
      }
    );

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
