import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import styles from './styles/dependencies'

const Dependencies = ({ classes, data }) => <Paper className={classes.paper}>
    <div className={classes.header}>
        <Typography>{`Dependencies (${data.length})`}</Typography>
    </div>
    <Divider light />
    <List dense style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 425 }}>
        {data.map((item, idx) => (
            <ListItem key={`item-${idx}`} className={classes.listItem}>
                <ListItemText
                    primary={<Typography variant="subtitle2">{item.name}</Typography>}
                    secondary={<Typography variant="subtitle2">{item.version}</Typography>}
                />
            </ListItem>))}
    </List>
</Paper>

Dependencies.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Dependencies)