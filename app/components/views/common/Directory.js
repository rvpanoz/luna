
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { iMessage } from "commons/utils";

import styles from './styles/directory';

const Directory = ({ classes, mode, directory, env, activePage }) => (
    <div className={classes.root}>
        <Tooltip title={iMessage('info', 'loadDirectory')}>
            <div>
                <IconButton
                    classes={{
                        root: classes.button
                    }}
                    disableRipple
                    disabled={activePage === 'packages'}
                    onClick={() => { }}
                >
                    <ArrowBackIcon className={classes.icon} />
                </IconButton>
            </div>
        </Tooltip>
        <div className={classes.flexContainer}>
            <Typography variant="subtitle1" component="div" color="textSecondary">
                {mode === 'local'
                    ? iMessage('info', 'workingDirectory')
                    : iMessage('info', 'showingGlobals')}
            </Typography>
            <div className={classes.flexGrow} />
            <Typography variant="subtitle2" component="div" color="textSecondary">
                {mode === 'local' ? directory : env.prefix}
            </Typography>
        </div>
    </div>
);

Directory.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    mode: PropTypes.string.isRequired,
    directory: PropTypes.string,
    activePage: PropTypes.string,
    env: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
};

export default withStyles(styles)(Directory);