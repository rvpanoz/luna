import { ipcRenderer } from 'electron';
import React, { useEffect, useCallback, ReactNode } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { hot } from 'react-hot-loader/root';
import { initActions, updateStatus } from '../models/common/actions';
import { setUIException, setSnackbar } from '../models/ui/actions';
import { switchcase } from '../commons/utils';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import AppDash from './AppDash';
import Packages from './Packages';
import { AppState } from '../state.d';

type Props = {
  children: ReactNode;
};

const mapState = (state: AppState) => ({
  uiException: state.uiException,
  onlineStatus: state.onlinestatus,
  activePage: state.ui.activePage,
  mode: state.mode,
  directory: state.directory,
  snackbar: state.ui.snackbar,
});

const App = () => {
  const dispatch = useDispatch();
  const { uiException, snackbar, activePage } = useMappedState(mapState);

  const onClose = useCallback(
    () =>
      dispatch(
        setSnackbar({
          ...snackbar,
          open: false,
          message: null,
          type: 'info',
          hideOnClose: false,
        })
      ),
    [dispatch, snackbar]
  );

  useEffect(() => {
    const updateOnlineStatus = () => {
      ipcRenderer.send(
        'app-online-status',
        navigator.onLine ? 'online' : 'offline'
      );

      dispatch({
        type: updateStatus.type,
        payload: { status: navigator.onLine ? 'online' : 'offline' }
      });
    };

    // passing in true for the third parameter causes the event to be captured on the way down.
    window.addEventListener('online', updateOnlineStatus, true);
    window.addEventListener('offline', updateOnlineStatus, true);

    ipcRenderer.on('finish-loaded', () => dispatch(initActions()));
    ipcRenderer.on('uncaught-exception', (_, ...args) => {
      dispatch({ type: setUIException.type, payload: { message: args[0] } });
    });

    updateOnlineStatus();

    return () => {
      ipcRenderer.removeAllListeners('finish-loaded');
      ipcRenderer.removeAllListeners('uncaught-exception');
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    }
  }, [dispatch]);

  if (uiException) {
    return uiException;
  }

  return (
    <>
      <AppSidebar />
      <div className="flex flex-col flex-1 pl-16">
        <div id="header">
          <AppHeader />
        </div>
        <div id="dash">
          <AppDash />
        </div>
        <div id="main-content" className="invisible">
          {switchcase({
            packages: () => <Packages />,
          })(<Packages />)(activePage)}
        </div>
      </div>
    </>
  );
}

export default hot(App);

