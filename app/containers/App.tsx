import { ipcRenderer } from 'electron';
import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { updateStatus } from '../models/common/actions';
import theme from '../styles/theme';
import AppLayout from '../components/layout/AppLayout';

import { AppState } from '../state.d';

type Props = {
  children: ReactNode;
};

const mapState = (state: AppState) => ({
  uiException: state.uiException
});

const App = (props: Props) => {
  const dispatch = useDispatch();
  const { uiException } = useMappedState(mapState);

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

    updateOnlineStatus();
  }, [dispatch]);

  return (
    <div className="container">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {!uiException ? <AppLayout /> : uiException}
      </MuiThemeProvider>
    </div>
  );
}
export default App;
