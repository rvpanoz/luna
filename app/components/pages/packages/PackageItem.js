/* eslint-disable react/require-default-props */

import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorIcon from '@material-ui/icons/ErrorTwoTone';
import WarningIcon from '@material-ui/icons/WarningTwoTone';
import CheckIcon from '@material-ui/icons/CheckTwoTone';
import UpdateIcon from '@material-ui/icons/UpdateTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './styles/packages';

const PackageItem = ({
  classes,
  name,
  isSelected,
  addSelected,
  version,
  isOutdated,
  latest,
  group,
  fromSearch,
  extraneous,
  missing,
  peerMissing,
  viewPackage,
  inOperation,
  inPackageJson,
  hasError
}) => {
  const rowRef = useRef();

  return (
    <TableRow
      key={`pkg-${name}`}
      hover
      ref={rowRef}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      classes={{
        root: classes.tableRow
      }}
      onClick={() => (inOperation ? {} : viewPackage(name, version))}
    >
      <TableCell padding="checkbox" style={{ width: '85px' }}>
        <Checkbox
          disabled={inOperation || (inPackageJson && fromSearch)}
          checked={isSelected}
          disableRipple
          onClick={e => {
            e.stopPropagation();

            if (inOperation) {
              return;
            }

            addSelected();
          }}
        />
      </TableCell>

      <TableCell padding="none" className={classes.tableCell}>
        <div
          className={cn(classes.flexContainerCell, {
            [classes.flexRow]: extraneous
          })}
        >
          <div className={classes.flexContainer}>
            <Typography className={classes.name}>{name}</Typography>
            {inOperation && (
              <CircularProgress
                size={15}
                thickness={5}
                className={classes.loader}
                color="primary"
              />
            )}
          </div>
          {!extraneous && group && !fromSearch && (
            <Typography variant="caption" className={classes.group}>
              {group}
            </Typography>
          )}
        </div>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <Typography className={classes.typo}>
          {fromSearch || !version ? 'N/A' : version}
        </Typography>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <Typography
          className={cn(classes.typo, {
            [classes.outdated]: isOutdated
          })}
        >
          {!isOutdated && !hasError && !fromSearch && 'Yes'}
          {isOutdated && !hasError && !fromSearch && latest}
          {hasError && 'N/A'}
        </Typography>

        <Typography className={classes.typo}>
          {fromSearch && !hasError && version}
        </Typography>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        {missing && (
          <Tooltip title="Package is missing">
            <Typography className={classes.typo}>
              <WarningIcon className={classes.statusMissing} />
            </Typography>
          </Tooltip>
        )}

        {peerMissing && (
          <Tooltip title="Package has peer missing">
            <Typography className={classes.typo}>
              <WarningIcon className={classes.statusPeerMissing} />
            </Typography>
          </Tooltip>
        )}

        {isOutdated && !hasError && (
          <Tooltip title="Package has an updated version">
            <Typography className={classes.typo}>
              <UpdateIcon className={classes.statusOutdated} />
            </Typography>
          </Tooltip>
        )}

        {!isOutdated && !peerMissing && !missing && version && (
          <Tooltip title="Package is up to date">
            <Typography className={classes.typo}>
              <CheckIcon className={classes.statusOK} />
            </Typography>
          </Tooltip>
        )}

        {!isOutdated && !peerMissing && !missing && !version && (
          <Tooltip title="Package has errors">
            <Typography className={classes.typo}>
              <ErrorIcon className={classes.statusError} />
            </Typography>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

PackageItem.propTypes = {
  classes: objectOf(string).isRequired,
  latest: oneOfType([string, object]),
  viewPackage: func.isRequired,
  name: string.isRequired,
  addSelected: func.isRequired,
  isSelected: bool.isRequired,
  fromSearch: bool,
  version: string,
  group: string,
  peerMissing: bool,
  extraneous: bool,
  missing: bool,
  isOutdated: bool,
  inOperation: bool,
  hasError: bool,
  inPackageJson: bool
};

export default withStyles(styles)(PackageItem);
