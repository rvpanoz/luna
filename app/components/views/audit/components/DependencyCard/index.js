import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Paper from 'components/common/Paper';

import DependenciesIcon from '@material-ui/icons/ViewModuleOutlined';
import DevDependenciesIcon from '@material-ui/icons/BuildOutlined';
import OptionalDependenciesIcon from '@material-ui/icons/NoteAddOutlined';
import TotalIcon from '@material-ui/icons/CheckOutlined';

import styles from './styles';

const DependencyCard = ({
  classes,
  className,
  label,
  name,
  total,
  percentage,
  ...rest
}) => {
  const rootClassName = cn(classes.root, className);

  return (
    <Paper elevenation={2} {...rest} className={rootClassName}>
      <div className={classes.content}>
        <div className={classes.details}>
          <Typography className={classes.title} variant="body2">
            {label}
          </Typography>
          <Typography className={classes.value} variant="h4">
            {total}
          </Typography>
        </div>
        <div className={cn(classes.iconWrapper, classes.secondaryColor)}>
          {name === 'dependencies' && <DependenciesIcon />}
          {name === 'devDependencies' && <DevDependenciesIcon />}
          {name === 'optionalDependencies' && <OptionalDependenciesIcon />}
          {name === 'totalDependencies' && <TotalIcon />}
        </div>
      </div>
      {percentage ? (
        <div className={classes.footer}>
          <Typography className={cn(classes.difference)} variant="body2">
            <TotalIcon color="primary" />
            <Typography className={classes.caption} component="span">
              {`${percentage}%`} of total dependencies
            </Typography>
          </Typography>
        </div>
      ) : null}
    </Paper>
  );
};

DependencyCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  percentage: PropTypes.string
};

export default withStyles(styles)(DependencyCard);
