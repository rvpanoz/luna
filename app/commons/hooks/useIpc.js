import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { merge } from 'ramda';

const useIpc = (channel, options) => {
  const { ipcEvent } = options || {};

  if (!ipcEvent) {
    throw new Error('ipcEvent must be given and must be a string');
  }

  const defaultState = {
    packages: [],
    error: null
  };

  const listenTo = `${ipcEvent}-close`;
  const [state, setData] = useState(defaultState);

  useEffect(() => {
    ipcRenderer.on(listenTo, (eventName, data) => {
      try {
        // const packages = data && JSON.parse(data); // TODO: parse in setupPackagesFromResponse
        setData(
          merge(defaultState, {
            packages: data
          })
        );
      } catch (error) {
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
