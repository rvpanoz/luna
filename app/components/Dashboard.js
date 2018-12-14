// eslint-disable

import { remote } from 'electron';
import React from 'react';
import { useDispatch } from 'redux-react-hook';

import { SET_MODE, TOGGLE_LOADER } from '../constants/ActionTypes';

const Dashboard = () => {
  const dispatch = useDispatch();

  const switchMode = (mode, directory) =>
    dispatch({ type: SET_MODE, mode, directory: directory || null });

  // eslint-disable-next-line
  const toggleLoader = loading => dispatch({ type: TOGGLE_LOADER, loading });

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
          const directory = filePath.join('');
          switchMode('LOCAL', directory);
        }
      }
    );
  };

  return (
    <React.Fragment>
      <button type="button" onClick={() => openPackage()}>
        local
      </button>
      <button type="button" onClick={() => switchMode('GLOBAL')}>
        global
      </button>
    </React.Fragment>
  );
};

export default Dashboard;
