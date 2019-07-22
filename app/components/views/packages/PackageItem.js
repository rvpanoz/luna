import React from "react";
import cn from "classnames";
import { useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { bool, objectOf, object, string, func, oneOfType } from "prop-types";

import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

import WarningIcon from "@material-ui/icons/WarningTwoTone";
import CheckIcon from "@material-ui/icons/CheckTwoTone";
import UpdateIcon from "@material-ui/icons/UpdateTwoTone";

import styles from "./styles/packageItem";

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
  inAudit,
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
      <TableCell padding="checkbox" style={{ width: "85px" }}>
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

      <TableCell padding="none" name="name" className={classes.tableCell}>
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
      <TableCell padding="none" name="installed" className={classes.tableCell}>
        <Typography className={classes.typo}>
          {fromSearch ? "No" : version}
        </Typography>
      </TableCell>
      <TableCell padding="none" name="latest" className={classes.tableCell}>
        <Typography
          className={cn(classes.typo, {
            [classes.outdated]: isOutdated
          })}
        >
          {latest}
        </Typography>
      </TableCell>
      <TableCell padding="none" name="status" className={classes.tableCell}>
        {missing && <WarningIcon className={classes.statusMissing} />}
        {isOutdated && !hasError ? (
          <UpdateIcon className={classes.statusOutdated} />
        ) : null}
        {!isOutdated && !peerMissing && !missing && version ? (
          <CheckIcon className={classes.statusOK} />
        ) : null}
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
  inPackageJson: bool,
  inAudit: bool
};

export default withStyles(styles)(PackageItem);
