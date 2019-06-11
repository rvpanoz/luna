/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import { flexContainer, defaultFont } from 'styles/variables';
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
    card: {
        width: 268,
        minHeight: 150
    },
    title: {
        fontSize: 18,
        margin: 0,
        padding: 0,
        fontWeight: 400,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
    },
    flexContainer: {
        ...flexContainer,
        width: '100%',
        justifyContent: 'space-between',
        padding: theme.spacing.unit,
        alignItems: 'center'
    },
    label: {
        ...defaultFont,
        fontSize: 12,
        paddingTop: theme.spacing.unit
    }
});

const InfoCard = ({ classes, title, subtitle, onAction, actionText, metadata }) => <Card className={classes.card}>
    <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
        </Typography>
        {subtitle && <Typography className={classes.subtitle} color="textSecondary">
            {subtitle}
        </Typography>}
        <Divider light />
        {metadata && <Typography className={classes.label}>{metadata}</Typography>}
    </CardContent>
    {onAction && <CardActions>
        <Button color="secondary" variant="outlined" onClick={onAction} size="small">{actionText}</Button>}
    </CardActions>}
</Card>

InfoCard.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    onAction: PropTypes.func,
    subtitle: PropTypes.string,
    metadata: PropTypes.string,
    actionText: PropTypes.string,
};

export default withStyles(styles)(InfoCard)