import React from 'react';
import {
  oneOfType,
  arrayOf,
  objectOf,
  object,
  string,
  array,
  bool
} from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3
  }
});

const VulnerabilitiesBarChart = ({ classes, data, theme }) => (
  <ResponsiveContainer width="100%" height={200} className={classes.container}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="vulnerabilities" fill={theme.palette['primary'].main} />
    </BarChart>
  </ResponsiveContainer>
);

VulnerabilitiesBarChart.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(oneOfType([object, array, bool, string])),
  theme: objectOf(string).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(VulnerabilitiesBarChart);
