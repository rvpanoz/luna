import React from 'react';
import { string, func} from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import { iMessage, showDialog } from 'commons/utils';

export const InstallAction = ({ packageName, handler }) => {
  const dialogOptions = {
    title: 'Confirmation',
    type: 'question',
    message: iMessage('confirmation', 'installPackage', {
      '%name%': packageName
    }),
    buttons: ['Cancel', 'Install']
  };

  const onClickHandler = () => showDialog(handler, dialogOptions);

  return (
    <Tooltip title={iMessage('title', 'installLatest')}>
      <div>
        <IconButton disableRipple color="primary" onClick={onClickHandler}>
          <AddIcon />
        </IconButton>
      </div>
    </Tooltip>
  );
};

InstallAction.propTypes = {
  packageName: string.isRequired,
  handler: func.isRequired
}

export const UpdateAction = ({ packageName, handler }) => {
  const dialogOptions = {
    title: 'Confirmation',
    type: 'question',
    message: iMessage('confirmation', 'updatePackage', {
      '%name%': packageName
    }),
    buttons: ['Cancel', 'Update']
  };

  const onClickHandler = () => showDialog(handler, dialogOptions);

  return (
    <Tooltip title={iMessage('title', 'updatePackage')}>
      <div>
        <IconButton disableRipple color="primary" onClick={onClickHandler}>
          <UpdateIcon />
        </IconButton>
      </div>
    </Tooltip>
  );
};

UpdateAction.propTypes = {
  packageName: string.isRequired,
  handler: func.isRequired
}

export const UninstallAction = ({ packageName, handler }) => {
  const dialogOptions = {
    title: 'Confirmation',
    type: 'question',
    message: iMessage('confirmation', 'uninstallPackage', {
      '%name%': packageName
    }),
    buttons: ['Cancel', 'Uninstall']
  };

  const onClickHandler = () => showDialog(handler, dialogOptions);

  return (
    <Tooltip title={iMessage('title', 'packageUninstall')}>
      <div>
        <IconButton
          disabled={packageName === 'npm'}
          disableRipple
          color="secondary"
          onClick={onClickHandler}
        >
          <RemoveIcon />
        </IconButton>
      </div>
    </Tooltip>
  );
};

UninstallAction.propTypes = {
  packageName: string.isRequired,
  handler: func.isRequired
}

