/* eslint-disable */

import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  terminal: {
    position: 'relative',
    top: '0',
    left: '0'
  },
  code: {
    display: 'block',
    fontSize: '1.2rem',
    color: theme.palette.secondary.light,
    padding: '1rem'
  },
  cursor: { animation: 'cursor-blink 300ms alternate linear infinite' },
  overlay: {
    height: '10vh',
    position: 'absolute',
    top: '0',
    left: '0',
    background: `repeating-linear-gradient(to bottom,  ${lighten(
      theme.palette.secondary.dark,
      0.1
    )} 1px, transparent 2px, rgba(0,0,0,.3) 3px)`
  },
  '@keyframes cursor-blink': {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  }
});

export default styles;
