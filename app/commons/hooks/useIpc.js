/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';

import { setPackagesStart } from 'models/packages/actions';
import { toggleLoader } from 'models/ui/actions';
import { parseMap } from '../utils';

const useIpc = (channel, options, inputs = []) => {
  const { ipcEvent, mode, directory } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dependenciesSet, setDependencies] = useState({
    data: [],
    name: null,
    version: null
  });
  const [outdatedSet, setOutdated] = useState({
    data: []
  });
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(listenTo, (event, status, commandArgs, data, error) => {
      const [name, version, packages] =
        data && parseMap(data, mode, directory, commandArgs);

      setErrors(error || null);

      if (Array.isArray(packages)) {
        if (commandArgs[0] === 'list') {
          setDependencies({
            data: packages && packages.length ? packages : null,
            name,
            version
          });
        } else {
          setOutdated({ data: packages && packages.length ? packages : null });
        }
      }
    });

    dispatch(toggleLoader({ loading: true, message: 'Loading packages..' }));
    dispatch(setPackagesStart());
    ipcRenderer.send(channel, options);

    return () => ipcRenderer.removeAllListeners([listenTo]);
  }, inputs);

  return [dependenciesSet, outdatedSet, errors];
};

export default useIpc;
