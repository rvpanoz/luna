/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';

import { setPackagesStart } from 'models/packages/actions';
import { parseMap } from '../utils';

const useIpc = (channel, options, inputs = []) => {
  const { ipcEvent, mode, directory } = options || {};
  const listenTo = `${ipcEvent}-close`;

  const [dependenciesSet, setDependencies] = useState({
    data: [],
    projectName: null,
    projectVersion: null
  });

  const [outdatedSet, setOutdated] = useState({
    data: []
  });

  const [commandErrors, setErrors] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(listenTo, (event, status, commandArgs, data, errors) => {
      const [name, version, packages] =
        data && parseMap(data, mode, directory, commandArgs);
      const errorsMessages = errors && errors.length ? errors : null;

      setErrors(errorsMessages);

      if (commandArgs[0] === 'list') {
        setDependencies({
          data: packages && packages.length ? packages : null,
          projectName: name,
          projectVersion: version
        });
      } else {
        setOutdated({ data: packages });
      }
    });

    setPackagesStart(dispatch, {
      options
    });
    ipcRenderer.send(channel, options);

    return () => ipcRenderer.removeAllListeners([listenTo]);
  }, inputs);

  return [dependenciesSet, outdatedSet, commandErrors];
};

export default useIpc;
