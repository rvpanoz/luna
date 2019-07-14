import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from '@material-ui/core';

const Dot = ({ classes, size, color, theme, className }) => (
  <div
    className={cn(classes.dotBase, {
      [className]: Boolean(className),
      [classes.dotLarge]: size === 'large',
      [classes.dotSmall]: size === 'small'
    })}
    style={{
      backgroundColor:
        color && theme.palette[color] && theme.palette[color].main
    }}
  />
);

Dot.propTypes = {
  classes: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array])).isRequired,
}

const styles = theme => ({
  dotBase: {
    width: 5,
    height: 5,
    backgroundColor: theme.palette.text.hint,
    borderRadius: '50%',
    transition: theme.transitions.create('background-color')
  },
  dotLarge: {
    width: 12,
    height: 12
  }
});

export default withStyles(styles, { withTheme: true })(Dot);
