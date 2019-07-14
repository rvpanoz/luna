/* eslint-disable no-unused-vars */

import React from 'react';

import { lighten } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from 'styles/variables';
import red from '@material-ui/core/colors/red';

import { objectOf, number, string, func, oneOfType, bool, array, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import CloseIcon from '@material-ui/icons/Close';

import { Transition } from 'components/common';
import { iMessage, } from 'commons/utils';

const ListItemDetail = ({ classes, text, value }) => <ListItem>
    <ListItemText
        primary={
            <Typography color="textSecondary" variant="body1">{text}</Typography>
        }
    />
    <ListItemSecondaryAction>
        <Typography color="textSecondary" variant="body1">{value}</Typography>
    </ListItemSecondaryAction>
</ListItem>

ListItemDetail.propTypes = {
    classes: objectOf(string).isRequired,
    text: string,
    value: string
}

const AdvisoryDetails = ({ classes, data, handleClose }) => {
    const { name, findings, title, vulnerable_versions, recommendation, found_by, updated, created, overview, deleted } = data
    const founder = found_by.name || "N/A";

    return (
        <div className={classes.wrapper}>
            <Grid container justify="space-between">
                <Grid item sm={10} md={10} lg={10} xl={10}>
                    <Transition>
                        <Card className={classes.card}>
                            <CardHeader
                                title={
                                    <Typography variant="h6">{name}</Typography>
                                }
                                className={classes.cardHeader}
                                subheader={
                                    <Typography color="textSecondary" variant="caption">
                                        {title}
                                    </Typography>
                                }
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography color="textSecondary" variant="body1">{recommendation}</Typography>
                                <Typography color="textSecondary" variant="body2" className={classes.overview}>{overview}</Typography>
                                <Divider className={classes.divider} light />
                                <List dense>
                                    <ListItemDetail text={iMessage('label', 'findings')} value={findings.length} />
                                    <ListItemDetail text={iMessage('label', 'vulnerable_versions')} value={vulnerable_versions} />
                                    <ListItemDetail text={iMessage('label', 'found_by')} value={founder} />
                                    <ListItemDetail text={iMessage('label', 'created')} value={format(new Date(created), 'DD/MM/YYYY h:mm')} />
                                    <ListItemDetail text={iMessage('label', 'updated')} value={format(new Date(updated), 'DD/MM/YYYY h:mm')} />
                                </List>
                            </CardContent>
                        </Card>
                    </Transition>
                </Grid>
                <Grid sm={2} item md={2} lg={2} xl={2}>
                    <Toolbar
                        disableGutters
                        variant="dense"
                        classes={{
                            root: classes.toolbar
                        }}
                    >
                        <Tooltip title={iMessage('title', 'clearActive')}>
                            <div>
                                <IconButton
                                    color="secondary"
                                    disableRipple
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </Toolbar>
                </Grid>
            </Grid>
        </div>
    );
};

const styles = theme => ({
    actions: {
        display: 'flex'
    },
    cardHeader: {
        padding: theme.spacing.unit
    },
    cardContent: {
        maxHeight: 375,
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: theme.spacing.unit
    },
    avatar: {
        width: 50,
        height: 50,
        backgroundColor: red[500]
    },
    badge: {
        margin: theme.spacing.unit
    },
    divider: {
        margin: theme.spacing.unit
    },
    group: {
        padding: 0,
        margin: 0
    },
    header: {
        ...defaultFont,
        backgroundColor: lighten(theme.palette.secondary.light, 0.9),
        fontSize: 20,
        fontWeight: 400,
        padding: theme.spacing.unit
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        width: '100%'
    },
    wrapper: {
        width: '100%'
    },
    withPadding: {
        padding: theme.spacing.unit
    },
    overview: {
        paddingTop: theme.spacing.unit * 2
    }
});

AdvisoryDetails.propTypes = {
    classes: objectOf(string).isRequired,
    data: objectOf(oneOfType([
        object,
        array,
        bool,
        string,
        number
    ])
    ),
    handleClose: func.isRequired
};

export default withStyles(styles)(AdvisoryDetails);
