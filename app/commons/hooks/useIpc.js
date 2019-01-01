/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';
import { parseMap } from '../utils';
import { setPackagesStart } from '../../models/packages/actions';
import { toggleLoader } from '../../models/ui/actions';

const useIpc = (channel, options, inputs = []) => {
  const { ipcEvent, mode, directory } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dependenciesSet, setDependencies] = useState({});
  const [outdatedSet, setOutdated] = useState({});
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(listenTo, (event, status, commandArgs, data, error) => {
      const [name, version, packages] =
        data && parseMap(data, mode, directory, commandArgs);

      if (error) {
        setErrors(error);
      } else {
        setErrors(null);
      }

      if (Array.isArray(packages)) {
        if (commandArgs[0] === 'list') {
          setDependencies({ data: packages, name, version });
        } else {
          setOutdated({ data: packages });
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
