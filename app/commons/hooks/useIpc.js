import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { assoc } from 'ramda';
import { parseMap } from '../utils';

const useIpc = (channel, options) => {
  const { ipcEvent, mode, directory } = options || {};

  const initialState = {
    data: [],
    error: null
  };

  const listenTo = `${ipcEvent}-close`;
  const [packages, setPackages] = useState(initialState);

  useEffect(
    () => {
      // eslint-disable-next-line
      ipcRenderer.on(listenTo, (eventName, status, cmd, data, error) => {
        const parsedPackages = data && parseMap(data, mode, directory);

        if (Array.isArray(parsedPackages)) {
          setPackages(assoc('packages', parsedPackages, packages));
        }
      });

      ipcRenderer.send(channel, options);
      return () => ipcRenderer.removeAllListeners(listenTo);
    },
    [options.directory]
  );

  return [packages.packages, packages.error];
};

export default useIpc;
