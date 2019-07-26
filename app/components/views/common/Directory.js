
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { iMessage } from "commons/utils";
import styles from './styles/directory';

const Directory = ({ classes, mode, directory, env }) => (
    <div className={classes.root}>
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
);

Directory.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    mode: PropTypes.string.isRequired,
    directory: PropTypes.string,
    env: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
};

export default withStyles(styles)(Directory);