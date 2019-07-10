import React from "react";
import PropTypes from 'prop-types';

import {
    Grid,
    LinearProgress,
    withStyles,
    Divider,
} from "@material-ui/core";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import Widget from "components/common/Widget";
import Typography from '@material-ui/core/Typography';
import Dot from "components/common/Dot";
import { iMessage } from 'commons/utils';

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

const PieChartData = [
    { name: "Low", value: 400, color: "primary" },
    { name: "Moderate", value: 300, color: "secondary" },
    { name: "High", value: 300, color: "warning" },
    { name: "Critical", value: 200, color: "error" }
];

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
        const { code, summary, detail } = data;

        return renderError(classes, code, summary, detail);
    }

    const dependenciesPercentage = (dependencies / totalDependencies) * 100;
    const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
    const optionalDependenciesPercentage =
        (optionalDependencies / totalDependencies) * 100;

    const findings = Object.values(advisories).map(({ findings }) => findings);
    console.log(actions, findings)

    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <Widget
                        title="Overview"
                        upperTitle
                        bodyClass={classes.fullHeightBody}
                        className={classes.card}
                    >
                        <Divider light />
                        <Typography variant="h6" color="textSecondary" className={classes.subtitle}>
                            {totalDependencies}&nbsp;total
                                </Typography>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <div className={classes.legendElement}>
                                    <Dot color="primary" />
                                    <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">
                                        dependencies
                                    </Typography>
                                    <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">({dependenciesPercentage.toFixed(2)})%</Typography>
                                </div>
                                <Typography variant="h5" color="textSecondary">{dependencies}</Typography>
                            </Grid>
                            <Grid item>
                                <div className={classes.legendElement}>
                                    <Dot color="secondary" />
                                    <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">
                                        dev
                                    </Typography>
                                    <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">({devDependenciesPercentage.toFixed(2)})%</Typography>
                                </div>
                                <Typography variant="h5" color="textSecondary">{devDependencies}</Typography>
                            </Grid>
                            <Grid item>
                                <div className={classes.legendElement}>
                                    <Dot color="error" />
                                    <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">optional</Typography>
                                    <Typography className={classes.legendElementText} variant="subtitle1" color="textSecondary">({optionalDependenciesPercentage.toFixed(2)})%</Typography>
                                </div>
                                <Typography variant="h5" color="textSecondary">{optionalDependencies}</Typography>
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <Widget
                        title="Findings"
                        upperTitle
                        className={classes.card}
                        bodyClass={classes.fullHeightBody}
                    >
                        <Divider light />
                        <div className={classes.findingsWrapper}>
                            <div className={classes.legendElement}>
                                <Dot color="warning" />
                                <Typography
                                    color="textSecondary"
                                    className={classes.legendElementText}
                                >
                                    Findings
                </Typography>
                            </div>
                            <div className={classes.legendElement}>
                                <Dot color="primary" />
                                <Typography
                                    color="textSecondary"
                                    className={classes.legendElementText}
                                >
                                    Actions
                </Typography>
                            </div>
                        </div>
                        <div className={classes.progressSection}>
                            <Typography
                                size="md"
                                color="textSecondary"
                                className={classes.progressSectionTitle}
                            >
                                Findings
              </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={findings.length}
                                classes={{ barColorPrimary: classes.progressBar }}
                                className={classes.progress}
                            />
                        </div>
                        <div>
                            <Typography
                                size="md"
                                color="textSecondary"
                                className={classes.progressSectionTitle}
                            >
                                Actions
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={actions.length}
                                classes={{ barColorPrimary: classes.progressBar }}
                                className={classes.progress}
                            />
                        </div>
                    </Widget>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Widget title="Vulnerabilities" upperTitle className={classes.card}>
                        <Divider light />
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <ResponsiveContainer width="100%" height={144}>
                                    <PieChart
                                        margin={{ left: theme.spacing.unit * 2 }}
                                    >
                                        <Pie
                                            data={PieChartData}
                                            innerRadius={45}
                                            outerRadius={60}
                                            dataKey="value"
                                        >
                                            {PieChartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={theme.palette[entry.color].main}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={classes.pieChartLegendWrapper}>
                                    {PieChartData.map(({ name, value, color }, index) => (
                                        <div key={color} className={classes.legendItemContainer}>
                                            <Dot color={color} />
                                            <Typography style={{ whiteSpace: 'nowrap' }}>&nbsp;{name}&nbsp;</Typography>
                                            <Typography color="textSecondary">
                                                &nbsp;{value}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </Grid>
                        </Grid>
                    </Widget>
                </Grid>
                <Grid item xs={12}>
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
        </div>
    );
};

const styles = theme => ({
    root: {},
    container: {},
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column"
    },
    innerContainer: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        padding: theme.spacing.unit
    },
    subtitle: {
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit * 2,
    },
    progressSection: {
        marginBottom: theme.spacing.unit
    },
    progressTitle: {
        marginBottom: theme.spacing.unit * 2
    },
    progress: {
        marginBottom: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main
    },
    pieChartLegendWrapper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: theme.spacing.unit
    },
    legendItemContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing.unit
    },
    fullHeightBody: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    tableWidget: {
        overflowX: "auto"
    },
    progressBar: {
        backgroundColor: theme.palette.warning.main
    },
    findingsWrapper: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        marginBottom: theme.spacing.unit
    },
    legendElement: {
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
        marginRight: theme.spacing.unit * 2,
    },
    legendElementText: {
        marginLeft: theme.spacing.unit
    },
    mainChartBody: {
        overflowX: 'auto',
    },
    mainChartHeader: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.only("xs")]: {
            flexWrap: 'wrap',
        }
    },
    mainChartHeaderLabels: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.only("xs")]: {
            order: 3,
            width: '100%',
            justifyContent: 'center',
            marginTop: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 2,
        }
    },
    mainChartHeaderLabel: {
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing.unit * 3,
    },
    mainChartLegentElement: {
        fontSize: '18px !important',
        marginLeft: theme.spacing.unit,
    }
});

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