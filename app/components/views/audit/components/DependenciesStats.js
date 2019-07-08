import React from 'react';
import {
  oneOfType,
  arrayOf,
  objectOf,
  object,
  string,
  array,
  bool,
  number
} from 'prop-types';
import { withStyles } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dot from 'components/common/Dot';
import { iMessage } from 'commons/utils';

const styles = theme => ({
  flexWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: theme.spacing.unit
  },
  legendItemContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit,
    justifyContent: 'flex-start'
  }
});

const DependenciesStats = ({ classes, data, total }) => (
  <div className={classes.flexWrapper}>
    <div className={classes.legendItemContainer}>
      <Dot size="large" />
      <Typography variant="h6" style={{ whiteSpace: 'nowrap', minWidth: 70 }}>
        &nbsp;{total}&nbsp;
          </Typography>
      <Typography variant="h6" color="textSecondary">
        {iMessage('title', 'total')}
      </Typography>
    </div>
    {data.map(item => {
      const { name, value, color, percentage } = item;

      return (
        <div key={color} className={classes.legendItemContainer}>
          <Dot color={color} size="large" />
          <Typography variant="h6" style={{ whiteSpace: 'nowrap', minWidth: 70 }}>
            &nbsp;{value}&nbsp;
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {name}
          </Typography>
          <Divider light />
        </div>
      )
    })}
  </div>
);

DependenciesStats.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(oneOfType([object, array, bool, string])),
  total: number.isRequired
};

export default withStyles(styles)(DependenciesStats);
