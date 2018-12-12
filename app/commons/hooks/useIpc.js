import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { merge } from 'ramda';
import { parse } from '../utils';

const useIpc = (channel, options) => {
  const { ipcEvent } = options || {};

  const defaultState = {
    packages: '',
    error: null
  };

  const listenTo = `${ipcEvent}-close`;
  const [state, setData] = useState(defaultState);

  useEffect(() => {
    ipcRenderer.on(listenTo, (eventName, status, cmd, data) => {
      try {
        const packages = data && parse(data);

        setData(
          merge(defaultState, {
            packages
          })
        );
      } catch (error) {
        console.error(error);
        setData({
          packages: null,
          error
        });
      }
    });

    ipcRenderer.send(channel, options);
    return () => ipcRenderer.removeAllListeners(listenTo);
  }, []);

  return [state.packages, state.error];
};

export default useIpc;
