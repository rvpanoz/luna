/**
 * useIpc hook in use with electron ipc renderer process
 */

import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'redux-react-hook';

import { setPackagesStart, updateData } from 'models/packages/actions';
import { parseMap, switchcase } from '../utils';

const useIpc = (channel, options, inputs = []) => {
  const { ipcEvent, mode, directory } = options || {};

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
    ipcRenderer.on(
      `${ipcEvent}-close`,
      (event, status, commandArgs, data, errors) => {
        if (!data || !status) {
          return;
        }

        const errorsMessages = errors && errors.length ? errors : null;
        setErrors(errorsMessages);

        const command = commandArgs && commandArgs[0];
        const [
          packages,
          name,
          version,
          description,
          license,
          author
        ] = parseMap(data, mode, directory, commandArgs);

        switchcase({
          list: () =>
            setDependencies({
              data: packages && packages.length ? packages : null,
              projectName: name,
              projectVersion: version,
              projectDescription: description,
              projectLicense: license,
              projectAuthor: author
            }),
          outdated: () => setOutdated({ data: packages })
        })('list')(command);
      }
    );

    dispatch(
      setPackagesStart({
        channel,
        options
      })
    );

    return () => ipcRenderer.removeAllListeners([`${ipcEvent}-close`]);
  }, inputs);

  return [dependenciesSet, outdatedSet, commandErrors];
};

export default useIpc;
