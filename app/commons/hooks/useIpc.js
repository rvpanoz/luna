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
    data: []
  });

  const [outdatedSet, setOutdated] = useState({
    data: []
  });

  const [projectSet, setProject] = useState({
    projectName: null,
    projectVersion: null,
    projectDescription: null
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

      setProject({
        projectName,
        projectVersion,
        projectDescription
      });

      switchcase({
        list: () =>
          setDependencies({
            data: packages,
            projectName,
            projectVersion,
            projectDescription
          }),
        outdated: () => {
          console.log(packages);
          return setOutdated({ data: packages });
        }
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

  return [dependenciesSet, outdatedSet, projectSet, commandErrors];
};

export default useIpc;
