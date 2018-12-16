/* eslint-disable */

import { remote } from 'electron';
import { useDispatch } from 'redux-react-hook';
import { SET_MODE, TOGGLE_LOADER } from '../constants/ActionTypes';
import { withStyles } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
  root: {
  }
};

const Dashboard = props => {
  const { classes } = props;
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
    <section className={classes.root}>
      <Typography>Dashboard</Typography>
      <button onClick={e => openPackage()}>Open</button>
    </section>
  );
};

export default withStyles(styles)(Dashboard);
