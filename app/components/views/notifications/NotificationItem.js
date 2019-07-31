import React from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { arrayOf, objectOf, string, func } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './styles/listItem';

const NotificationItem = ({
  classes,
  id,
  type,
  body,
  requiredBy,
  required,
  selected,
  handleSelectOne
}) => {
  const isSelected = selected.indexOf(id) !== -1;

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
        name="name"
        className={cn(classes.tableCell, classes.cellText)}
      >
        <div
          className={cn(classes.flexContainerCell, {
            [classes.flexRow]: type === 'ERR'
          })}
        >
          <div className={classes.flexContainer}>
            <Typography className={classes.name}>{body}</Typography>
          </div>
        </div>
      </TableCell>
      <TableCell padding="none" name="required" className={classes.tableCell}>
        <Typography className={classes.typo}>{required}</Typography>
      </TableCell>
      <TableCell padding="none" name="requiredBy" className={classes.tableCell}>
        <Typography>{requiredBy}</Typography>
      </TableCell>
    </TableRow>
  );
};

NotificationItem.propTypes = {
  classes: objectOf(string).isRequired,
  id: string.isRequired,
  body: string.isRequired,
  required: string.isRequired,
  requiredBy: string.isRequired,
  type: string.isRequired,
  handleSelectOne: func.isRequired,
  selected: arrayOf(string)
};

export default withStyles(styles)(NotificationItem);
