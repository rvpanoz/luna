import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/toolbar';

const ToolbarView = ({ classes, title }) => <div className={classes.root}>
    <Toolbar
        disableGutters
    >
        <div className={classes.header}>
            <Typography variant="h4" className={classes.title}>
                {title}
            </Typography>
        </div>
        <div className={classes.spacer} />
    </Toolbar>
</div>

ToolbarView.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(ToolbarView);
