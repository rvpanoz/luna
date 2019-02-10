/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import styles from './styles/terminalStyles';

const Terminal = ({ classes, commands }) => (
  <div className={classes.root}>
    <div className={classes.top}>
      <div className={classes.buttons}>
        <button type="button" className={cn(classes.button, classes.close)} />
        <button
          type="button"
          className={cn(classes.button, classes.minimize)}
        />
        <button
          type="button"
          className={cn(classes.button, classes.maximize)}
        />
      </div>
      <span className={classes.title}>running commands</span>
    </div>
    <div className={classes.terminal}>
      {commands &&
        commands.map((command, idx) => (
          <span key={`cmd-${idx}`}>{command.command}</span>
        ))}
    </div>
  </div>
);

Terminal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  commands: PropTypes.arrayOf(PropTypes.object).isRequired
};

const withStylesTerminal = withStyles(styles)(Terminal);
export default withStylesTerminal;
