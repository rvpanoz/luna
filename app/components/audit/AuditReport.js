import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import BuildIcon from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { iMessage } from 'commons/utils';

import StatsCard from './StatsCard';
import styles from './styles/audit';

const AuditReport = ({
  classes,
  dependencies,
  devDependencies,
  optionalDependencies,
}) => {
  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      <Grid item lg={4} md={4} sm={12} xl={4}>
        <StatsCard
          title={iMessage('title', 'dependencies')}
          value={dependencies}
          color="primary"
          icon={<ListIcon />}
        />
        <Hidden smUp>
          <Typography variant="h6" color="textSecondary">
            {iMessage('title', 'dependencies')}&nbsp;{dependencies}
          </Typography>
        </Hidden>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xl={4}>
        <StatsCard
          title={iMessage('title', 'devDependencies')}
          value={devDependencies}
          color="danger"
          icon={<BuildIcon />}
        />
        <Hidden smUp>
          <Typography variant="h6" color="textSecondary">
            {iMessage('title', 'devDependencies')}&nbsp;
            {devDependencies}
          </Typography>
        </Hidden>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xl={4}>
        <StatsCard
          title={iMessage('title', 'optionalDependencies')}
          value={optionalDependencies}
          color="warning"
          icon={<AddIcon />}
        />
        <Hidden smUp>
          <Typography variant="h6" color="textSecondary">
            {iMessage('title', 'optionalDependencies')}&nbsp;
            {optionalDependencies}
          </Typography>
        </Hidden>
      </Grid>
    </Grid>
  );
};

AuditReport.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AuditReport);
