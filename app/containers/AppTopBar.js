import React from 'react';
import { useState, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { objectOf, string } from 'prop-types';
import { useMappedState, useDispatch } from 'redux-react-hook';
import cn from 'classnames';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { Init, Settings } from 'components/views/common/';
import { TopBar } from 'components/views/topBar/';

import { showDialog } from 'commons/utils';
import { setActivePage } from 'models/ui/actions';
import { setMode } from 'models/common/actions';
import { runInit } from 'models/npm/actions';
import { navigatorParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils';

import styles from './styles/appTopBar';

const mapState = ({
  common: { mode, directory, activePage },
  notifications: { notifications },
  ui: {
    loaders: {
      loader: { loading }
    }
  },
  npm: { env: {
    metricsRegistry,
    auditLevel,
    cache
  } }
}) => ({
  activePage,
  notifications,
  mode,
  directory,
  metricsRegistry,
  auditLevel,
  cache,
  loading
});

const AppTopBar = ({ classes, className }) => {
  const {
    metricsRegistry,
    auditLevel,
    cache,
    mode,
    directory,
    notifications,
    loading,
    activePage
  } = useMappedState(mapState);

  const [initFlow, toggleInitFlow] = useState(false)
  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    active: null
  });

  const dispatch = useDispatch();

  const showInitDialog = useCallback(() => {
    const dialogHandler = filePath => {
      dispatch(
        setActivePage({
          page: 'packages',
          paused: false
        })
      );
      dispatch(setMode({ mode: 'local', directory: filePath.join('') }));
    };

    return showDialog(dialogHandler, { mode: 'file', ...navigatorParameters });
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    setDialog({ ...dialog, open: false, active: null, title: '' })
    toggleInitFlow(false)
  }, [dialog])

  const onNpmInit = useCallback(() => {
    dispatch(
      runInit({
        ipcEvent: 'npm-init',
        cmd: ['init'],
        directory
      })
    );

    closeDialog();
  }, [dispatch, closeDialog, directory])

  const setActivePageHandler = page =>
    dispatch(
      setActivePage({
        page,
        paused: true
      })
    );

  return (
    <div
      className={cn(classes.root, {
        [className]: className !== undefined
      })}
    >
      <TopBar
        mode={mode}
        directory={directory}
        notifications={notifications}
        loading={loading}
        onLoadDirectory={showInitDialog}
        setActivePage={setActivePageHandler}
        activePage={activePage}
        onInitFlow={() => setDialog({ ...dialog, open: true, active: 'Init', title: iMessage('title', 'createPackageJson') })}
        onShowSettings={() => setDialog({ ...dialog, open: true, active: 'Settings', title: iMessage('title', 'settings') })}
      />
      <Dialog
        open={dialog.open}
        fullWidth
        maxWidth="sm"
        onClose={closeDialog}
        aria-labelledby="npm-init"
      >
        <DialogTitle disableTypography classes={{ root: classes.dialogTitle }}>{dialog.title}</DialogTitle>
        <DialogContent>
          {dialog.active === 'Init' && <Init onClose={closeDialog} enableInit={() => toggleInitFlow(true)} />}
          {dialog.active === 'Settings' && <Settings
            onClose={closeDialog}
            metricsRegistry={metricsRegistry}
            cache={cache}
            auditLevel={auditLevel}
          />}
        </DialogContent>
        <DialogActions>
          {dialog.active === 'Init' && <Button
            color="primary"
            variant="outlined"
            onClick={() => onNpmInit()}
            disabled={!initFlow}
          >
            {iMessage('action', 'create')}
          </Button>}
          <Button classes={{
            root: classes.closeButton
          }} variant="outlined" color="secondary" onClick={closeDialog}>{iMessage('action', 'close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AppTopBar.propTypes = {
  classes: objectOf(string).isRequired,
  className: string
};

export default withStyles(styles)(AppTopBar);
