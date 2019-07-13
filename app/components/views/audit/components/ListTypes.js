import React from 'react'
import { objectOf, oneOfType, string, array, object } from 'prop-types'
import { withStyles } from '@material-ui/core'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import { iMessage } from 'commons/utils'
import { AUDIT_TYPES } from 'constants/AppConstants'
import { Widget } from 'components/common';

const ListTypes = ({ classes, types }) => {
    const keys = Object.keys(types);
    const values = Object.values(types);

    return <Widget title={iMessage('title', 'overview')}><List>
        {Object.values(types).map((type, idx) => {
            return <ListItem key={AUDIT_TYPES[keys[idx]]}>
                <ListItemText
                    primary={<Typography color="textSecondary" variant="body1">{AUDIT_TYPES[keys[idx]]}</Typography>}
                />
                <ListItemSecondaryAction>
                    <Typography color="textSecondary" variant="h6">{type.length}</Typography>
                </ListItemSecondaryAction>
            </ListItem>
        })}
    </List>
    </Widget>
}

const styles = theme => ({});

ListTypes.propTypes = {
    classes: objectOf(string).isRequired,
    types: oneOfType([array, object]).isRequired,
}

export default withStyles(styles)(ListTypes)