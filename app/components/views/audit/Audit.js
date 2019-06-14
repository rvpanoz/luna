import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

// icons
import FixIcon from '@material-ui/icons/Build';

// card component
import DependencyCard from './components/DependencyCard';

// styles
import styles from './styles/audit';

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

const Audit = ({ classes, data }) => {
  if (!data) {
    return (
      <div className={classes.containerHolder}>
        <Typography
          variant="subtitle1"
          className={cn(classes.noData, classes.withPadding)}
        >
          No audit data
        </Typography>
        <Typography variant="caption" className={cn(classes.helperText)}>
          navigate to Actions tab and run npm audit
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
      dependencies,
      devDependencies,
      optionalDependencies,
      totalDependencies
    }
  } = data;

  const dependenciesPercentage = (dependencies / totalDependencies) * 100;
  const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
  const optionalDependenciesPercentage =
    (optionalDependencies / totalDependencies) * 100;

  return (
    <Paper className={classes.paper}>
      <div className={classes.container}>
        <div className={classes.flexContainer}>
          <div className={classes.header}>
            <Typography variant="h6" className={classes.title}>
              Audit report
            </Typography>
          </div>
          <Toolbar>
            <Tooltip title="Fix vulnerabilities">
              <div>
                <Button
                  aria-label="audit-fix"
                  disabled
                  onClick={() => {}}
                  color="primary"
                  variant="contained"
                >
                  <FixIcon className={classes.icon} />
                  Fix all
                </Button>
              </div>
            </Tooltip>
          </Toolbar>
        </div>
        <Divider light />
        <div className={classes.topSection}>
          <Grid container spacing={8}>
            <Grid item lg={3} sm={4} xl={2} xs={12}>
              <DependencyCard
                className={classes.item}
                name="dependencies"
                label="Dependencies"
                total={dependencies}
                percentage={dependenciesPercentage.toFixed(2)}
              />
            </Grid>
            <Grid item lg={3} sm={4} xl={2} xs={12}>
              <DependencyCard
                className={classes.item}
                name="devDependencies"
                label="Dev dependencies"
                total={devDependencies}
                percentage={devDependenciesPercentage.toFixed(2)}
              />
            </Grid>
            <Grid item lg={3} sm={4} xl={2} xs={12}>
              <DependencyCard
                className={classes.item}
                name="optionalDependencies"
                label="Opt dependencies"
                total={optionalDependencies}
                percentage={optionalDependenciesPercentage.toFixed(2)}
              />
            </Grid>
            <Grid item lg={3} sm={4} xl={2} xs={12}>
              <DependencyCard
                className={classes.item}
                name="totalDependencies"
                label="Total dependencies"
                total={totalDependencies}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.bottomSection}>todo..</div>
      </div>
    </Paper>
  );
};

Audit.defaultProps = {
  data: null
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

export default withStyles(styles)(Audit);
