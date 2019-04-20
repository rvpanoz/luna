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

import ErrorIcon from '@material-ui/icons/ErrorOutlined';
import WarningIcon from '@material-ui/icons/WarningOutlined';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import UpdateIcon from '@material-ui/icons/UpdateOutlined';
import Tooltip from '@material-ui/core/Tooltip';

import { switchcase } from 'commons/utils';
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
  hasError
}) => {
  const rowRef = useRef();

  console.log({
    name,
    extraneous,
    missing,
    peerMissing,
    fromSearch,
    group,
    version,
    latest
  });

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
          disabled={inOperation}
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
          {!extraneous && group && (
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
        {latest && !hasError ? (
          <Typography className={cn(classes.typo, classes.outdated)}>
            {latest}
          </Typography>
        ) : !latest && !hasError ? (
          <Typography className={classes.typo}>N/A</Typography>
        ) : null}
        {fromSearch && !hasError && version}
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <Typography className={classes.typo}>
          {missing && <WarningIcon className={classes.statusMissing} />}
          {peerMissing && <WarningIcon className={classes.statusPeerMissing} />}
          {isOutdated && <UpdateIcon className={classes.statusOutdated} />}
          {!isOutdated && !peerMissing && !missing && version && (
            <CheckIcon className={classes.statusOK} />
          )}
          {!isOutdated && !peerMissing && !missing && !version && (
            <ErrorIcon className={classes.statusError} />
          )}
        </Typography>
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
  inOperation: bool
};

export default withStyles(styles)(PackageItem);
