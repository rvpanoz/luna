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

import Typography from '@material-ui/core/Typography';
import Dot from 'components/common/Dot';
import { switchcase } from 'commons/utils';

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
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit
  }
});

const DependenciesStats = ({ classes, data }) => (
  <div className={classes.flexWrapper}>
    {data.map(item => {
      const { name, value, color, percentage } = item;

      return (
        <div key={color} className={classes.legendItemContainer}>
          <Dot color={color} size="large" />
          <Typography variant="h6" style={{ whiteSpace: 'nowrap' }}>
            &nbsp;{value}&nbsp;
          </Typography>

          <Typography variant="h6" color="textSecondary">
            {name}
          </Typography>
        </div>
      );
    })}
  </div>
);

DependenciesStats.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(oneOfType([object, array, bool, string]))
};

export default withStyles(styles)(DependenciesStats);
