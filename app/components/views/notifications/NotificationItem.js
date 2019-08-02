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
  reason,
  requiredByName,
  requiredByVersion,
  requiredName,
  requiredVersion,
  selected,
  handleSelectOne
}) => {
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
      </TableRow>
    </Tooltip>
  );
};

NotificationItem.propTypes = {
  classes: objectOf(string).isRequired,
  id: string.isRequired,
  reason: string.isRequired,
  requiredName: string.isRequired,
  requiredVersion: string.isRequired,
  requiredBy: arrayOf(string),
  handleSelectOne: func.isRequired,
  selected: arrayOf(string)
};

export default withStyles(styles)(NotificationItem);
