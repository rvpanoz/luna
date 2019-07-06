import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import { remote } from 'electron';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import styles from './styles/dependencies'

const Dependencies = ({ classes, data }) => <Paper className={classes.paper}>
    <div className={classes.header}>
        <Typography>{`Versions (${data.length})`}</Typography>
    </div>
    <Divider light />
    <List dense style={{ overflowY: 'scroll', minWidth: 225, maxHeight: 425 }}>
        {data.map((item, idx) => (
            <ListItem key={`item-${idx}`} className={classes.listItem}>
                <ListItemText
                    primary={<Typography variant="subtitle2">{item}</Typography>}
                />
                <ListItemSecondaryAction>
                    <Tooltip title={`Install version ${item}`}>
                        <div>
                            <IconButton
                                aria-label="install-version"
                                onClick={() => {
                                    remote.dialog.showMessageBox(
                                        remote.getCurrentWindow(),
                                        {
                                            title: 'Confirmation',
                                            type: 'question',
                                            message: iMessage(
                                                'confirmation',
                                                'installVersion',
                                                { '%version%': item, '%name%': active.name }
                                            ),
                                            buttons: ['Cancel', 'Install']
                                        },
                                        btnIdx => {
                                            if (Boolean(btnIdx) === true) {
                                                if (mode === 'local') {
                                                    return toggleOptions({
                                                        open: true,
                                                        single: true,
                                                        name,
                                                        version: item
                                                    });
                                                }

                                                const pkgOptions = group
                                                    ? [PACKAGE_GROUPS[group]]
                                                    : ['save-prod'];

                                                dispatch(
                                                    installPackage({
                                                        cmd: ['install'],
                                                        name,
                                                        pkgOptions,
                                                        version: item,
                                                        single: true
                                                    })
                                                );
                                            }
                                        }
                                    );
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>))}
    </List>
</Paper>

Dependencies.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Dependencies)