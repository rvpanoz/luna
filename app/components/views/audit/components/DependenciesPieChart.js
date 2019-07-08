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

import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const styles = theme => ({});

const DependenciesPieChart = ({ classes, data, theme }) => (
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie data={data} innerRadius={45} outerRadius={60} dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={theme.palette[entry.color].main} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

DependenciesPieChart.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(oneOfType([object, array, bool, string])),
  theme: objectOf(string).isRequired
};

export default withStyles(styles, {
  withTheme: true
})(DependenciesPieChart);
