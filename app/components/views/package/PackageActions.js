import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import {
  updatePackages,
  installPackage,
  uninstallPackages
} from 'models/packages/actions';

import { iMessage, showDialog } from 'commons/utils';

export const InstallAction = ({ packageName }) => {
  const dialogOptions = {
    title: 'Confirmation',
    type: 'question',
    message: iMessage('confirmation', 'installPackage', {
      '%name%': packageName
    }),
    buttons: ['Cancel', 'Install']
  };

  const dialogHandler = () =>
    dispatch(
      installPackage({
        ipcEvent: 'npm-install',
        cmd: ['install'],
        name: packageName,
        version: 'latest',
        single: true
      })
    );

  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  return (
    <div>
      <Tooltip title={iMessage('title', 'installLatest')}>
        <IconButton disableRipple color="primary" onClick={onClickHandler}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const UpdateAction = ({ packageName }) => {
  const dialogOptions = {
    title: 'Confirmation',
    type: 'question',
    message: iMessage('confirmation', 'updatePackage', {
      '%name%': packageName
    }),
    buttons: ['Cancel', 'Update']
  };
  const dialogHandler = () =>
    dispatch(
      updatePackages({
        ipcEvent: 'npm-update',
        cmd: ['update'],
        multiple: true,
        packages: [packageName]
      })
    );

  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  return (
    <div>
      <Tooltip title={iMessage('title', 'updatePackage')}>
        <IconButton disableRipple color="primary" onClick={onClickHandler}>
          <UpdateIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export const UninstallAction = ({ packageName }) => {
  const dialogOptions = {
    title: 'Confirmation',
    type: 'question',
    message: iMessage('confirmation', 'uninstallPackage', {
      '%name%': packageName
    }),
    buttons: ['Cancel', 'Uninstall']
  };

  const dialogHandler = () =>
    dispatch(
      installPackage({
        ipcEvent: 'npm-update',
        cmd: ['update'],
        name: packageName,
        single: true
      })
    );

  const onClickHandler = () => showDialog(dialogHandler, dialogOptions);

  return (
    <div>
      <Tooltip title={iMessage('title', 'packageUninstall')}>
        <IconButton
          disabled={packageName === 'npm'}
          disableRipple
          color="secondary"
          onClick={onClickHandler}
        >
          <RemoveIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
