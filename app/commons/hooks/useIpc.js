import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { parseMap } from '../utils';

const useIpc = (channel, options) => {
  const { ipcEvent, mode, directory } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dataSet, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, toggleLoader] = useState(false);

  useEffect(
    () => {
      // eslint-disable-next-line
      ipcRenderer.on(listenTo, (eventName, status, cmd, data, error) => {
        const parsedPackages = data && parseMap(data, mode, directory);

        if (error) {
          setError(error);
        }

        if (Array.isArray(parsedPackages)) {
          setData(parsedPackages);
          toggleLoader(false);
        }
      });

      toggleLoader(true);
      ipcRenderer.send(channel, options);
      return () => ipcRenderer.removeAllListeners(listenTo);
    },
    [options.directory]
  );

  return [dataSet, loading, error];
};

export default useIpc;
