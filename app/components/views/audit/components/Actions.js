/* eslint-disable no-unused-vars */

import React from 'react';
import { objectOf, oneOfType, string, array, object } from 'prop-types';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Update from '@material-ui/icons/Update';
import { iMessage } from 'commons/utils';
import { Widget } from 'components/common';
import styles from '../styles/listTypes';

const Actions = ({ classes, theme, data }) => <Widget noBodyPadding title={`${iMessage('title', 'actions')} (${data.length})`}>
    <List className={classes.body}>
        {data.map(({ action, target, isMajor, ...rest }, idx) => {
            return (
                <ListItem key={rest.module}>
                    <ListItemText
                        primary={
                            <Typography color="textSecondary" variant="body1">
                                {rest.module}
                            </Typography>
                        }
                        secondary={`depth: ${rest.depth || 1} | target: ${target}`}
                    />
                    <ListItemSecondaryAction>
                        {action === 'install' && <IconButton color="primary"><Add /></IconButton>}
                        {action === 'update' && <IconButton color="secondary"><Update /></IconButton>}
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })}
    </List>
</Widget>

Actions.propTypes = {
    classes: objectOf(string).isRequired,
    theme: objectOf(oneOfType([string, object, array])).isRequired,
    data: oneOfType([array, object]).isRequired
};

export default withStyles(styles, {
    withTheme: true
})(Actions);
