/* eslint-disable no-unused-vars */

import React from 'react'
import { objectOf, oneOfType, string, array, object } from 'prop-types'
import { withStyles } from '@material-ui/core'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { iMessage } from 'commons/utils'
import { Widget, Dot } from 'components/common';

const ListDotTypes = ({ classes, types }) => <Widget noBodyPadding title={iMessage('title', 'vulnerabilities')}>
    <List className={classes.body}>
        {types.map(({ value, label, color }) => (
            <ListItem key={label}>
                <ListItemText
                    primary={<Typography color="textSecondary">{label}&nbsp;({value})</Typography>}
                />
                <ListItemSecondaryAction>
                    <Dot size="large" color={color} />
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
</Widget>

const styles = theme => ({
    body: {
        overflowY: 'scroll',
        [theme.breakpoints.up('md')]: {
            maxHeight: 450
        }
    },
});

ListDotTypes.propTypes = {
    classes: objectOf(string).isRequired,
    types: oneOfType([array, object]).isRequired,
}

export default withStyles(styles)(ListDotTypes)