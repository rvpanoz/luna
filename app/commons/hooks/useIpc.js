/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';

import { clearAll } from 'models/ui/actions';
import { setPackagesStart } from 'models/packages/actions';
import { parseMap, switchcase } from '../utils';

const useIpc = (channel, options, inputs = []) => {
  const { ipcEvent, mode, directory, paused } = options || {};

  const [dependenciesSet, setDependencies] = useState({
    data: [],
    projectName: null,
    projectVersion: null,
    projectDescription: null,
    projectLicense: null,
    projectAuthor: null
  });

  const [outdatedSet, setOutdated] = useState({
    data: []
  });

  const [commandErrors, setErrors] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ipcRenderer.on(`${ipcEvent}-close`, (event, status, cmd, data) => {
      if (!data) {
        return dispatch({ type: clearAll.type });
      }

      const command = cmd && cmd[0];
      const [
        packages,
        errors,
        projectName,
        projectVersion,
        projectDescription,
        projectLicense,
        projectAuthor
      ] = parseMap(data, mode, directory, cmd);

      if (errors) {
        setErrors(errors);
      }

      switchcase({
        list: () =>
          setDependencies({
            data: packages && packages.length ? packages : null,
            projectName,
            projectVersion,
            projectDescription,
            projectLicense,
            projectAuthor
          }),
        outdated: () => setOutdated({ data: packages })
      })('list')(command);
    });

    if (!paused) {
      dispatch(
        setPackagesStart({
          channel,
          options,
          paused
        })
      );
    }

    return () => ipcRenderer.removeAllListeners([`${ipcEvent}-close`]);
  }, inputs);

  return [dependenciesSet, outdatedSet, commandErrors];
};

export default useIpc;
