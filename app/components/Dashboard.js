import { remote, ipcRenderer } from 'electron';
import React, { useLayoutEffect } from 'react';

const openPackage = () => {
  remote.dialog.showOpenDialog(
    remote.getCurrentWindow(),
    {
      title: 'Open package.json file',
      buttonLabel: 'Analyze',
      filters: [
        {
          name: 'package.json',
          extensions: ['json']
        }
      ],
      properties: ['openFile']
    },
    filePath => {
      if (filePath) {
        const directory = filePath[0];
        console.log(directory);
        ipcRenderer.send('analyze-json', directory);
      }
    }
  );
};

const Dashboard = () => {
  return null;
};

export default Dashboard;
