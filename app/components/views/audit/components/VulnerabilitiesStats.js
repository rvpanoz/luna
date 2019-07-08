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
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  legendItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const VulnerabiltiesStats = ({ classes, data }) => (
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

VulnerabiltiesStats.propTypes = {
  classes: objectOf(string).isRequired,
  data: arrayOf(oneOfType([object, array, bool, string]))
};

export default withStyles(styles)(VulnerabiltiesStats);
