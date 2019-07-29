import React from 'react';
import cn from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { bool, objectOf, object, string, func, oneOfType } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import styles from './styles/list';

const NotificationItem = ({
    classes,
    id,
    type,
    body,
    requiredBy,
    required,
    selected
}) => {

    const isSelected = selected.indexOf(id) !== -1

    return (
        <TableRow
            key={id}
            hover
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={-1}
            selected={isSelected}
            classes={{
                root: classes.tableRow
            }}
            onClick={null}
        >
            <TableCell padding="checkbox" style={{ width: '85px' }}>
                <Checkbox
                    checked={isSelected}
                    disableRipple
                    onClick={null}
                />
            </TableCell>

            <TableCell padding="none" name="name" className={classes.tableCell}>
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
                <Typography className={classes.typo}>
                    {required}
                </Typography>
            </TableCell>
            <TableCell padding="none" name="requiredBy" className={classes.tableCell}>
                <Typography>
                    {requiredBy}
                </Typography>
            </TableCell>

        </TableRow>
    );
};

NotificationItem.propTypes = {
    classes: objectOf(string).isRequired,
};

export default withStyles(styles)(NotificationItem);
