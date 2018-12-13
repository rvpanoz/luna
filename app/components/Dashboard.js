// eslint-disable

import { remote } from 'electron';
import React from 'react';
import { useDispatch } from 'redux-react-hook';

import { SET_MODE } from '../constants/ActionTypes';

const Dashboard = () => {
  const dispatch = useDispatch();

  const switchMode = mode =>
    dispatch({ type: SET_MODE, mode, directory: null });

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

          dispatch({ type: SET_MODE, mode: 'LOCAL', directory });
        }
      }
    );
  };

  return (
    <React.Fragment>
      <button type="button" onClick={() => openPackage()}>
        local
      </button>
      <button type="button" onClick={() => switchMode()}>
        global
      </button>
    </React.Fragment>
  );
};

export default Dashboard;
