/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    card: {
        width: 268,
        minHeight: 175
    },
    title: {
        fontSize: 18,
        margin: 0,
        padding: 0,
        fontWeight: 400,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
    }
});

const InfoCard = ({ classes, title, subtitle }) => <Card className={classes.card}>
    <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
        </Typography>
        {subtitle && <Typography className={classes.subtitle} color="textSecondary">
            {subtitle}
        </Typography>}
    </CardContent>
</Card>

InfoCard.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default withStyles(styles)(InfoCard)