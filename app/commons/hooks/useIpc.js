/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';
import { parseMap } from '../utils';
import { setPackagesStart } from '../../models/packages/actions';

const useIpc = (channel, options) => {
  const { ipcEvent, mode, directory, counter, manager } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dataSet, setData] = useState([]);
  const [outdatedSet, setOutdated] = useState([]);
  const [error, setError] = useState(null);
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
          if (cmd[0] === 'list') {
            setData(parsedPackages);
          } else {
            setOutdated(parsedPackages);
          }
        }
      });

      dispatch(setPackagesStart());
      ipcRenderer.send(channel, options);
      return () => ipcRenderer.removeAllListeners(listenTo);
    },
    [counter, manager]
  );

  return [dataSet, outdatedSet, error];
};

export default useIpc;
