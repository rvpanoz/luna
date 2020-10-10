import React, { useState, useCallback, useReducer, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { showDialog } from 'commons/utils';
import { setActivePage, setPageRows } from 'models/ui/actions';
import { setMode } from 'models/common/actions';
import { runInit } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import Init from './Init';
import Settings from './Settings';
import TopBar from './TopBar';
import styles from './styles/topbar';

const mapState = ({
  common: { mode, directory, activePage },
  notifications: { notifications },
  ui: {
    pagination: { page, rowsPerPage },
    loaders: {
      loader: { loading },
    },
  },
}) => ({
  activePage,
  notifications,
  mode,
  directory,
  loading,
  rowsPerPage,
});

const AppTopBar = ({ classes, className }) => {
  const {
    mode,
    directory,
    notifications,
    loading,
    activePage,
    rowsPerPage,
  } = useMappedState(mapState);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    view: '',
    dialogTitle: '',
    dialogOpen: false,
    selectedDirectory: null,
  });

  const setActivePageHandler = (page) =>
    dispatch(
      setActivePage({
        page,
        paused: true,
      })
    );

  const onLoadDirectory = useCallback(() => {
    const dialogOptions = {
      title: 'Open package.json file',
      buttonLabel: 'Analyze',
      filters: [
        {
          name: 'package.json',
          extensions: ['json'],
        },
      ],
      properties: ['openFile'],
      noResolveAliases: true,
    };

    const dialogHandler = ({ filePaths }) => {
      if (!filePaths || !filePaths.lenght) {
        return;
      }

      dispatch(setMode({ mode: 'local', directory: filePaths.join() }));
      dispatch(
        setActivePage({
          page: 'packages',
          paused: false,
        })
      );
    };

    return showDialog(dialogHandler, { mode: 'file', ...dialogOptions });
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    setState({
      ...state,
      view: '',
      dialogOpen: false,
    });
  }, [state]);

  const onNpmInit = useCallback(() => {
    if (!state.selectedDirectory) {
      return;
    }

    dispatch(
      runInit({
        ipcEvent: 'npm-init',
        cmd: ['init'],
        directory: state.selectedDirectory,
      })
    );

    closeDialog();
  }, [state.selectedDirectory, dispatch, closeDialog]);

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined,
      })}
    >
      <TopBar
        mode={mode}
        directory={directory}
        notifications={notifications}
        loading={loading}
        activePage={activePage}
        onLoadDirectory={onLoadDirectory}
        setActivePage={setActivePageHandler}
        onCreate={() => {
          setState({
            ...state,
            view: 'init',
            dialogOpen: true,
            dialogTitle: iMessage('title', 'createPackageJson'),
          });
        }}
        onShowSettings={() =>
          setState({
            ...state,
            view: 'settings',
            dialogOpen: true,
            dialogTitle: iMessage('title', 'settings'),
          })
        }
      />
      <Dialog
        open={state.dialogOpen}
        fullWidth
        maxWidth="sm"
        onClose={closeDialog}
        aria-labelledby="npm-init"
      >
        <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
          {state.dialogTitle}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {state.view === 'init' && (
            <Init
              onClose={closeDialog}
              onNpmInit={onNpmInit}
              onSelectDirectory={(selectedDirectory) =>
                setState({ ...state, selectedDirectory })
              }
            />
          )}
          {state.view === 'settings' && (
            <Settings
              onClose={closeDialog}
              rowsPerPage={rowsPerPage}
              onChangeRowsPage={(rowsPerPage) =>
                dispatch(setPageRows({ rowsPerPage }))
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            classes={{
              root: classes.closeButton,
            }}
            variant="outlined"
            color="secondary"
            onClick={closeDialog}
          >
            {iMessage('action', 'close')}
          </Button>
          {state.view === 'init' && (
            <Button
              color="primary"
              variant="outlined"
              onClick={onNpmInit}
              disabled={!state.selectedDirectory}
            >
              {iMessage('action', 'create')}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

AppTopBar.propTypes = {
  classes: objectOf(string).isRequired,
  className: string,
};

export default withStyles(styles)(AppTopBar);
