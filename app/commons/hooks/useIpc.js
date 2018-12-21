/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';
import { parseMap } from '../utils';
import { setPackagesStart } from '../../models/packages/actions';

const useIpc = (channel, options) => {
  const { ipcEvent, mode, directory } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dataSet, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, toggleLoader] = useState(false);
  const dispatch = useDispatch();

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
      dispatch(setPackagesStart());
      ipcRenderer.send(channel, options);
      return () => ipcRenderer.removeAllListeners(listenTo);
    },
    [options.directory]
  );

  return [dataSet, loading, error];
};

export default useIpc;
