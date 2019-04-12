/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';

import { setPackagesStart } from 'models/packages/actions';
import { switchcase, parseDependencies, isJson } from 'commons/utils';

const useIpc = (channel, ipcParameters, inputs) => {
  const { ipcEvent, paused } = ipcParameters || {};
  const [mode, directory] = inputs;

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
    ipcRenderer.on(`${ipcEvent}-close`, (event, status, cmd, data) => {
      if (!data || !isJson(data)) {
        return;
      }

      const [command] = cmd;
      const [
        packages,
        errors,
        projectName,
        projectVersion,
        projectDescription
      ] = parseDependencies(data, mode, directory, cmd);

      if (errors) {
        setErrors(errors);
      }

      switchcase({
        list: () =>
          setDependencies({
            data: packages,
            projectName,
            projectVersion,
            projectDescription
          }),
        outdated: () => setOutdated({ data: packages })
      })('list')(command);
    });

    if (!paused) {
      dispatch(
        setPackagesStart({
          channel,
          options: ipcParameters,
          paused
        })
      );
    }

    return () => ipcRenderer.removeAllListeners([`${ipcEvent}-close`]);
  }, [mode, directory]);

  return [dependenciesSet, outdatedSet, commandErrors];
};

export default useIpc;
