/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';

import { doStartPackages } from 'models/packages/selectors';

import { doToggleLoader } from 'models/ui/selectors';
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

      if (error) {
        setErrors(error);
      }

      if (commandArgs[0] === 'list') {
        setDependencies({
          data: packages && packages.length ? packages : null,
          name,
          version
        });
      } else {
        setOutdated({ data: packages });
      }
    });

    doToggleLoader(dispatch, { loading: true, message: 'Loading packages..' });
    doStartPackages(dispatch);
    ipcRenderer.send(channel, options);

    return () => ipcRenderer.removeAllListeners([listenTo]);
  }, inputs);

  return [dependenciesSet, outdatedSet, errors];
};

export default useIpc;
