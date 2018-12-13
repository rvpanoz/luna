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

  useEffect(
    () => {
      // eslint-disable-next-line
      ipcRenderer.on(listenTo, (eventName, status, cmd, data, error) => {
        try {
          const packages = data && parse(data);

          setData(
            merge(defaultState, {
              packages
            })
          );
        } catch (err) {
          setData({
            packages: null,
            error: err
          });
        }
      });

      ipcRenderer.send(channel, options);
      return () => ipcRenderer.removeAllListeners(listenTo);
    },
    [options.directory]
  );

  return [state.packages, state.error];
};

export default useIpc;
