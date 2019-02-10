import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames';

import { defaultFont } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%'
  },
  top: {
    ...defaultFont,
    height: '22px',
    background: 'linear-gradient(0deg, #d8d8d8, #ececec)',
    borderTop: '1px solid white',
    borderBottom: '1px solid #b3b3b3',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: '13px',
    lineHeight: '22px',
    textAlign: 'center'
  },
  buttons: {
    position: 'absolute',
    float: 'left',
    margin: '0 8px'
  },
  button: {
    padding: '0',
    margin: '0',
    marginRight: '4px',
    width: '12px',
    height: '12px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  close: {
    backgroundColor: '#ff6159'
  },
  maximize: {
    backgroundColor: '#25cc3e'
  },
  minimize: {
    backgroundColor: '#ffbf2f'
  },
  terminal: {
    padding: '4px',
    backgroundColor: 'black',
    opacity: '0.7',
    height: '218px',
    color: 'white',
    fontFamily: "'Source Code Pro', monospace",
    fontWeight: '200',
    fontSize: '14px',
    whiteSpace: '-o-pre-wrap',
    wordWrap: 'break-word',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    overflowY: 'auto'
  }
});

const Terminal = ({ classes, text }) => {
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.buttons}>
          <button className={cn(classes.button, classes.close)} />
          <button className={cn(classes.button, classes.minimize)} />
          <button className={cn(classes.button, classes.maximize)} />
        </div>
        <span className={classes.title}>npm command</span>
      </div>
      <div className={classes.terminal}>{text}</div>
    </div>
  );
};

Terminal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  text: PropTypes.string.isRequired
};

const withStylesTerminal = withStyles(styles)(Terminal);
export default withStylesTerminal;
