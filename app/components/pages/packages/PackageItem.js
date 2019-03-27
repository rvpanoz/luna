/* eslint-disable react/require-default-props */

import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';

import ErrorIcon from '@material-ui/icons/Error';
import CheckIcon from '@material-ui/icons/Check';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './styles/packages';

const PackageItem = ({
  classes,
  name,
  isSelected,
  addSelected,
  version,
  latest,
  isOutdated,
  group,
  fromSearch,
  extraneous,
  viewPackage
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
      onClick={() => viewPackage(name, version)}
    >
      <TableCell padding="checkbox" style={{ width: '85px' }}>
        <Checkbox
          checked={isSelected}
          disableRipple
          onClick={e => {
            e.stopPropagation();
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
          {extraneous && (
            <Tooltip title="extraneous means a package is installed but is not listed in your project's package.json">
              <ErrorIcon className={classes.extraneous} />
            </Tooltip>
          )}
          <Typography
            className={cn({
              [classes.flexItem]: extraneous
            })}
          >
            {name}
          </Typography>
          {!extraneous && (
            <Typography variant="caption" className={classes.group}>
              {group}
            </Typography>
          )}
        </div>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <Typography>
          {fromSearch ? 'N/A' : version}
          {extraneous && (
            <Typography component="span" className={classes.extraneous}>
              extraneous
            </Typography>
          )}
        </Typography>
      </TableCell>
      <TableCell padding="none" className={classes.tableCell}>
        <Typography
          className={cn({
            [classes.outdated]: isOutdated,
            [classes.updated]: !isOutdated
          })}
        >
          {latest || (fromSearch ? version : <CheckIcon />)}
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
  isOutdated: bool.isRequired,
  fromSearch: bool,
  version: string,
  group: string,
  extraneous: bool
};

export default withStyles(styles)(PackageItem);
