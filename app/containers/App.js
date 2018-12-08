import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import Layout from './Layout';
import '../app.global.css';

const App = () => {
  useEffect(() => {
    ipcRenderer.on('uncaught-exception', (event, exceptionError) => {
      console.error('uncaught-exception', exceptionError);
    });

    return ipcRenderer.removeAllListeners('uncaught-exception');
  });

  return (
    <div id="app">
      <Layout />
    </div>
  );
};

export default App;
