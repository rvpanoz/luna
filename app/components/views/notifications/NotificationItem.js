import React from 'react';
import { useState } from 'react'
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { arrayOf, objectOf, string, func } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import InfoIcon from '@material-ui/icons/InfoTwoTone';
import { iMessage } from 'commons/utils';

import styles from './styles/listItem';

const NotificationItem = ({
  classes,
  id,
  selected,
  handleSelectOne,
  ...restProps
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { requiredName, requiredVersion, reason, requiredByName } = restProps;
  const isSelected = selected.indexOf(id) !== -1;
  const open = Boolean(anchorEl);

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
        className={cn(classes.tableCell, classes.cellText)}
        align="left"
      >
        <div className={classes.flexContainerCell}>
          <Typography className={classes.name}>{requiredName}</Typography>
        </div>
      </TableCell>
      <TableCell
        padding="none"
        className={cn(classes.tableCell, classes.cellText)}
      >
        <div className={classes.flexContainerCell}>
          <Typography className={classes.name}>{requiredVersion}</Typography>
        </div>
      </TableCell>
      <TableCell
        padding="none"
        className={cn(classes.tableCell, classes.cellText)}
        align="right"
      >
        <div className={classes.flexContainerCell}>
          <Typography
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={e => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
          >
            <InfoIcon color="secondary" />
          </Typography>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={() => setAnchorEl(null)}
            disableRestoreFocus
          >
            <Typography>{iMessage('label', 'reason')}:&nbsp;{reason}</Typography>
            <Typography>{iMessage('label', 'requiredByName')}:{requiredByName || ' - '}</Typography>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};

NotificationItem.propTypes = {
  classes: objectOf(string).isRequired,
  id: string.isRequired,
  reason: string.isRequired,
  requiredName: string,
  requiredVersion: string,
  requiredByName: string,
  handleSelectOne: func.isRequired,
  selected: arrayOf(string)
};

export default withStyles(styles)(NotificationItem);
