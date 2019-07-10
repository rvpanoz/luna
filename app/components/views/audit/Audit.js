import React from "react";
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
    Grid,
    LinearProgress,
    withStyles,
    Divider,
} from "@material-ui/core";
import {
    RadialBarChart, RadialBar, Cell, Legend, Tooltip, ResponsiveContainer,
    LabelList, PolarAngleAxis
} from 'recharts';

import {
    Surface, Radar, RadarChart, PolarGrid,
    PolarRadiusAxis,
    Label
} from 'recharts';

import Widget from "components/common/Widget";
import Typography from '@material-ui/core/Typography';
import Dot from "components/common/Dot";
import { iMessage } from 'commons/utils';
import styles from './styles/audit'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FolderIcon from '@material-ui/icons/FolderOpen';

// dev
import DATA from '../../../npm-audit.json';

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

const StatsList = ({ items, palette }) => <Table>
    <TableBody>
        {items.map(({ value, color, label }) => (
            <TableRow key={label}>
                <TableCell component="th" scope="row">
                    {label}
                </TableCell>
                <TableCell align="right">{value}</TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>;

const DependenciesWidget = ({ classes, value, percentage, title, text }) => <Widget
    title={title}
    upperTitle
    bodyClass={classes.fullHeightBody}
    className={classes.card}
>
    <Divider light />

    <Grid container>
        <Grid item>
            <div className={cn(classes.legendElement, classes.marginTop)}>
                <Typography variant="h4" color="textSecondary">{value}</Typography>
                <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">({percentage.toFixed(2)}%)</Typography>
            </div>

            <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">
                    {text}
                </Typography>
            </div>
        </Grid>
    </Grid>
</Widget>

const Audit = ({ classes, theme, data }) => {
    const {
        content: {
            metadata: {
                dependencies,
                devDependencies,
                optionalDependencies,
                totalDependencies,
                vulnerabilities
            },
            advisories,
            actions
        },
        error
    } = DATA;
    if (error) {
        console.error(error);
        return null
    }

    const { info, high, critical, moderate, low } = vulnerabilities;
    const dependenciesPercentage = (dependencies / totalDependencies) * 100;
    const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
    const optionalDependenciesPercentage =
        (optionalDependencies / totalDependencies) * 100;

    const totalAdvisories = Object.values(advisories).length
    const totalActions = Object.values(actions).length

    const vulnerabilitiesData = [
        { name: 'Critical', color: 'error', value: critical, fill: theme.palette.error.main },
        { name: 'Moderate', color: 'secondary', value: moderate, fill: theme.palette.primary.main },
        { name: 'Info', color: 'primary', value: info, fill: theme.palette.secondary.main },
        { name: 'High', color: 'warning', value: high, fill: theme.palette.warning.main },
        { name: 'Low', color: 'primary', value: low, fill: theme.palette.info.main }
    ];

    const legendStyle = {
        lineHeight: '24px',
        left: 0
    }

    const totalVulnerabilities = vulnerabilitiesData.reduce((total, { value }) => total + value, 0)
    const statsListData = [
        { value: critical, label: 'critical', secondary: true, color: 'error' },
        { value: high, label: 'high', secondary: true, color: 'error' },
        { value: moderate, label: 'moderate', secondary: true, color: 'error' },
        { value: low, label: 'low', secondary: true, color: 'error' },
        { value: info, label: 'info', secondary: true, color: 'error' }
    ];

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item lg={3} md={3} sm={12} xl={3}>
                    <DependenciesWidget classes={classes} value={dependencies} text="dependencies" title="Dependencies" percentage={dependenciesPercentage} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xl={3}>
                    <DependenciesWidget classes={classes} value={devDependencies} text="dev" title="Development" percentage={devDependenciesPercentage} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xl={3}>
                    <DependenciesWidget classes={classes} value={optionalDependencies} text="dev" title="Optional" percentage={optionalDependenciesPercentage} />
                </Grid>

                <Grid item sm={12} lg={12} md={12} xl={12}>
                    <Widget title="Vulnerabilities" upperTitle className={classes.card}>
                        <Divider light />
                        <Grid container>
                            <Grid item>
                                <ResponsiveContainer width={300} height={300}>
                                    <RadialBarChart
                                        data={vulnerabilitiesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="10%"
                                        outerRadius="100%"
                                    >
                                        <RadialBar
                                            minAngle={15}
                                            label={{ fill: '#666', position: 'insideStart' }}
                                            background
                                            clockWise={true}
                                            minPointSize={15}
                                            background
                                            dataKey="value" />
                                        {/* <Legend iconSize={15} width={120} height={140} layout="vertical" verticalAlign="top" wrapperStyle={legendStyle} /> */}
                                        <Tooltip />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </Grid>
                            <Grid item>
                                <div className={classes.padLeft}>
                                    <ResponsiveContainer width={300} height={300}>
                                        <RadialBarChart
                                            data={vulnerabilitiesData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="10%"
                                            outerRadius="100%"
                                        >
                                            {/* <RadialBar
                                            minAngle={15}
                                            label={{ fill: '#666', position: 'insideStart' }}
                                            background
                                            clockWise={true}
                                            minPointSize={15}
                                            background
                                            dataKey="value" /> */}
                                            <Legend iconSize={15} width={120} height={140} layout="vertical" verticalAlign="top" wrapperStyle={legendStyle} />
                                            <Tooltip />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                    {/* <StatsList items={statsListData} palette={theme.palette} /> */}
                                    {/* <div className={cn(classes.legendElement, classes.marginTop)}>
                                        <Typography variant="h4" color="error">{critical}</Typography>
                                        <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">critical</Typography>
                                    </div>
                                    <div className={cn(classes.legendElement, classes.marginTop)}>
                                        <Typography variant="h4" color={theme.palette.warning.main}>{high}</Typography>
                                        <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">high</Typography>
                                    </div>
                                    <div className={cn(classes.legendElement, classes.marginTop)}>
                                        <Typography variant="h4" color="secondary">{moderate}</Typography>
                                        <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">moderate</Typography>
                                    </div>
                                    <div className={cn(classes.legendElement, classes.marginTop)}>
                                        <Typography variant="h4" color="primary">{low}</Typography>
                                        <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">low</Typography>
                                    </div> */}
                                </div>
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
                <Grid item xs={12} lg={12} md={12} xl={12}>
                    <Widget
                        bodyClass={classes.mainChartBody}
                        header={
                            <div className={classes.mainChartHeader}>
                                <Typography variant="h6" color="textSecondary">
                                    Results
                                    </Typography>
                                <div className={classes.mainChartHeaderLabels}>
                                    <div className={classes.mainChartHeaderLabel}>
                                        <Dot color="warning" />
                                        <Typography className={classes.mainChartLegentElement}>Actions</Typography>
                                    </div>
                                    <div className={classes.mainChartHeaderLabel}>
                                        <Dot color="primary" />
                                        <Typography className={classes.mainChartLegentElement}>Findings</Typography>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                    </Widget>
                </Grid>
            </Grid>
        </div >
    );
};

Audit.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.bool,
            PropTypes.string
        ])
    )
};

export default withStyles(styles, { withTheme: true })(Audit);