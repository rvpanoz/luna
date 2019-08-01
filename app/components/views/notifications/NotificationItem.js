import React, { useCallback } from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { arrayOf, objectOf, string, func } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './styles/listItem';

const NotificationItem = ({
  classes,
  id,
  body,
  requiredBy,
  required,
  selected,
  handleSelectOne,
}) => {
  const isSelected = selected.indexOf(id) !== -1;
  const nameSpace = required.indexOf('/');
  let version, newRequired, requiredName, requiredVersion, atIndex;

  if (nameSpace > -1) {
    atIndex = required.indexOf('@') // todo..not working
    newRequired = required.slice(atIndex, nameSpace);
  }

  [requiredName, requiredVersion] = (newRequired && newRequired.split('@')) || (required && required.split('@'));
  console.log(required, requiredName, requiredVersion)
  if (body === 'extraneous') {
    [version] = requiredVersion.split(' ')
  }

  const renderTitle = useCallback(() => {
    return <Typography component="span" className={classes.span}>{requiredBy.join('<br />')}</Typography>
  }, [requiredBy]);

  return (
    <Tooltip title={renderTitle()}>
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
        <TableCell padding="none" name="required" className={classes.tableCell}>
          <Typography className={classes.typo}>{requiredName}</Typography>
        </TableCell>
        <TableCell padding="none" name="requiredBy" className={classes.tableCell}>
          <Typography className={classes.typo}>{version || requiredVersion}</Typography>
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
      </TableRow>
    </Tooltip>
  );
};

NotificationItem.propTypes = {
  classes: objectOf(string).isRequired,
  id: string.isRequired,
  body: string.isRequired,
  required: string.isRequired,
  requiredBy: arrayOf(string),
  handleSelectOne: func.isRequired,
  selected: arrayOf(string)
};

export default withStyles(styles)(NotificationItem);
