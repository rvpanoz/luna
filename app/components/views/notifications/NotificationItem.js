import React from 'react';
import cn from 'classnames';
import semver from 'semver';

import { withStyles } from '@material-ui/core/styles';
import { arrayOf, objectOf, string, func, oneOfType, array } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './styles/listItem';

const { log } = console;

const NotificationItem = ({
  classes,
  id,
  body,
  requiredBy,
  required,
  selected,
  handleSelectOne,
  onSetActive
}) => {
  const isSelected = selected.indexOf(id) !== -1;
  const [requiredName, requiredVersion] = required && required.split('@');
  let version;

  if (body === 'extraneous') {
    [version] = requiredVersion.split(' ')
  }

  return (
    <TableRow
      key={id}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
      classes={{
        root: classes.tableRow
      }}
      hover
      onClick={() => onSetActive({
        active: {
          id,
          body,
          required: requiredName,
          version: version || requiredVersion,
          requiredBy
        }
      })}
    >
      <TableCell padding="checkbox" style={{ width: '55px' }}>
        <Checkbox
          checked={isSelected}
          disableRipple
          onClick={e => handleSelectOne(e, id)}
        />
      </TableCell>

      <TableCell
        padding="none"
        className={cn(classes.tableCell, classes.cellText)}
        align="center"
      >
        <div className={classes.flexContainerCell}>
          <Typography className={classes.name}>{body}</Typography>
        </div>
      </TableCell>
      <TableCell padding="none" name="required" className={classes.tableCell}>
        <Typography className={classes.typo}>{requiredName}</Typography>
      </TableCell>
      <TableCell padding="none" name="requiredBy" className={classes.tableCell}>
        <Typography className={classes.typo}>{version || requiredVersion}</Typography>
      </TableCell>
    </TableRow>
  );
};

NotificationItem.propTypes = {
  classes: objectOf(string).isRequired,
  id: string.isRequired,
  body: string.isRequired,
  required: string.isRequired,
  active: oneOfType([string, array]),
  requiredBy: arrayOf(string),
  handleSelectOne: func.isRequired,
  onSetActive: func,
  selected: arrayOf(string)
};

export default withStyles(styles)(NotificationItem);
