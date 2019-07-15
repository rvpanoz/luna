/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Widget } from 'components/common';
import { iMessage } from 'commons/utils';

import styles from '../styles/advisoryDetails';

const OverviewCard = ({ classes, title, values }) => {
  const { dependencies, devDependencies, optionalDependencies } = values;
  const totalDependencies = Object.values(values).reduce(
    (acc, value) => acc + value,
    0
  );

  const dependenciesPercentage = (dependencies / totalDependencies) * 100;
  const devDependenciesPercentage = (devDependencies / totalDependencies) * 100;
  const optionalDependenciesPercentage =
    (optionalDependencies / totalDependencies) * 100;

  return (
    <Widget title={title}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="subtitle" color="textSecondary">
            {iMessage('label', 'dependencies')}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {dependencies}&nbsp;({dependenciesPercentage.toFixed(2)})%
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle" color="textSecondary">
            {iMessage('label', 'devDependencies')}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {devDependencies}&nbsp;({devDependenciesPercentage.toFixed(2)})%
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle" color="textSecondary">
            {iMessage('label', 'optionalDependencies')}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {optionalDependencies}&nbsp;(
            {optionalDependenciesPercentage.toFixed(2)})%
          </Typography>
        </Grid>
      </Grid>
    </Widget>
  );
};

OverviewCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.oneOfType([PropTypes.array]),
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(OverviewCard);
