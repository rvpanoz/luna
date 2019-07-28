import React from 'react';
import { useState, useCallback } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { TopBar, Init } from 'components/views/common/';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { showDialog } from 'commons/utils';
import { setActivePage } from 'models/ui/actions'
import { setMode } from 'models/common/actions'
import { navigatorParameters } from 'commons/parameters';
import { iMessage } from 'commons/utils'

const mapState = ({
  common: { mode, directory },
  notifications: { notifications },
  ui: {
    loaders: {
      loader: { loading }
    }
  },
  npm: { env } }) => ({
    notifications,
    mode,
    directory,
    env,
    loading
  });

const AppTopBar = () => {
  const {
    env,
    mode,
    directory,
    notifications,
    loading
  } = useMappedState(mapState)
  const [initFlow, toggleInitFlow] = useState(false);
  const dispatch = useDispatch();

  const loadDirectory = () => {
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
  };

  const setActivePageHandler = useCallback(() => dispatch(setActivePage({
    page: 'audit',
    paused: true
  })))

  return (<>
    <TopBar
      mode={mode}
      directory={directory}
      notifications={notifications}
      env={env}
      loading={loading}
      onLoadDirectory={loadDirectory}
      setActivePage={setActivePageHandler}
      onInitFlow={() => toggleInitFlow(true)} />
    <Dialog
      open={initFlow}
      maxWidth="sm"
      onClose={() => toggleInitFlow(false)}
      aria-labelledby="npm-init"
    >
      <DialogTitle>{iMessage('title', 'createPackageJson')}</DialogTitle>
      <DialogContent>
        <Init onClose={() => toggleInitFlow(false)} />
      </DialogContent>
    </Dialog>
  </>)
};

export default AppTopBar;
