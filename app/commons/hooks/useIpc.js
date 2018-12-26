/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';
import { parseMap } from '../utils';
import { setPackagesStart } from '../../models/packages/actions';

const useIpc = (channel, options) => {
  const { ipcEvent, mode, directory, inputs = [] } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dependenciesSet, setDependencies] = useState({});
  const [outdatedSet, setOutdated] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line
    ipcRenderer.on(listenTo, (event, status, commandArgs, data, error) => {
      const [name, version, packages] =
        data && parseMap(data, mode, directory, commandArgs);

      if (error) {
        setError(error);
      }

      if (Array.isArray(packages)) {
        if (commandArgs[0] === 'list') {
          setDependencies({ data: packages, name, version });
        } else {
          setOutdated({ data: packages });
        }
      } else {
        setError('Packages data is invalid');
      }
    });

    dispatch(setPackagesStart());
    ipcRenderer.send(channel, options);

    return () => ipcRenderer.removeAllListeners(listenTo);
  }, inputs);

  return [dependenciesSet, outdatedSet, error];
};

export default useIpc;
