import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { iMessage } from 'commons/utils';

import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis
} from "recharts";

import Widget from 'components/common/Widget';
import Dot from 'components/common/Dot';

import styles from './styles/audit'

const renderError = (classes, code, summary) => (
    <div className={classes.container}>
        <div className={classes.flexContainer}>
            <div className={classes.header}>
                <Typography className={classes.title}>{code}</Typography>
                <Divider className={classes.divider} light />
                <Typography variant="subtitle1">{summary}</Typography>
            </div>
        </div>
    </div>
);

const AuditReport = ({ classes, data, theme }) => {
    if (!data) {
        return (
            <div className={classes.containerHolder}>
                <Typography
                    variant="subtitle1"
                    className={cn(classes.noData, classes.withPadding)}
                >
                    {iMessage('info', 'noAuditData')}
                </Typography>
                <Typography variant="caption" className={cn(classes.helperText)}>
                    {iMessage('info', 'npmAuditHelperText')}
                </Typography>
            </div>
        );
    }

    const { error } = data;

    if (error) {
        const { code, summary, detail } = data;

        return renderError(classes, code, summary, detail);
    }

    const {
        content: {
            metadata: {
                dependencies,
                devDependencies,
                optionalDependencies,
                totalDependencies,
                vulnerabilities
            },
            advisories
        }
    } = data;

    const dependenciesPercentage = (dependencies / totalDependencies) * 100;
    const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
    const optionalDependenciesPercentage =
        (optionalDependencies / totalDependencies) * 100;

    const totalVulnerabilities = Object.values(vulnerabilities).reduce((acc, item) => {
        return acc + item
    }, 0);

    const { info, critical, high, moderate } = vulnerabilities;

    const pieChartData = [
        { name: "Dependencies", value: dependencies, color: "primary" },
        { name: "Dev dependencies", value: devDependencies, color: "secondary" },
        { name: "Optional", value: optionalDependencies, color: "warning" },
    ];

    return <Paper className={classes.paper}>
        <div className={classes.container}>
            <div className={classes.flexContainer}>
                <div className={classes.header}>
                    <Typography variant="h6" className={classes.title}>
                        {iMessage('title', 'audit')}
                    </Typography>
                </div>
            </div>
            <Divider light />
            <div className={classes.topSection}>
                <Grid container spacing={8}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Widget
                            title={iMessage('title', 'overview')}
                            upperTitle
                            bodyClass={classes.fullHeightBody}
                            className={classes.card}
                        >
                            <Divider light />
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container direction="row" justify="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography color="textSecondary">
                                                {iMessage('label', 'dependencies')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography color="textSecondary">
                                                {dependencies} ({dependenciesPercentage.toFixed(2)}%)
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" justify="space-between" alignItems="center">
                                        <Grid item>
                                            <ResponsiveContainer width="100%" height={150}>
                                                <PieChart margin={{ left: theme.spacing.unit * 2 }}>
                                                    <Pie data={pieChartData} innerRadius={45} outerRadius={60} dataKey="value">
                                                        {pieChartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={theme.palette[entry.color].main} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Grid>
                                        <Grid item>
                                            <ResponsiveContainer width="100%" height={150}>
                                                {pieChartData.map(({ name, value, color }, index) => (
                                                    <div key={color} className={classes.legendItemContainer}>
                                                        <Dot color={color} />
                                                        <Typography style={{ whiteSpace: 'nowrap' }}>&nbsp;{name}&nbsp;</Typography>
                                                        <Typography color="textSecondary">
                                                            &nbsp;{value}
                                                        </Typography>
                                                    </div>
                                                ))}
                                            </ResponsiveContainer>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Widget>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Paper>
}

AuditReport.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.bool,
            PropTypes.string
        ])
    ),
    theme: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles, {
    withTheme: true
})(AuditReport)