import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { whiteColor as white, blackColor as black } from '../variables';

export default {
  common: {
    black,
    white,
    neutral: '#e4e5ff',
    muted: '#ccceee'
  },
  primary: {
    contrastText: white,
    light: lighten('#006db3', 0.1),
    main: '#006db3',
    dark: darken('#006db3', 0.1)
  },
  secondary: {
    contrastText: white,
    light: lighten('#e51a90', 0.1),
    main: '#e51a90',
    dark: darken('#e51a90', 0.1)
  },
  success: {
    contrastText: white,
    light: lighten('#4caf50', 0.1),
    main: '#4caf50',
    dark: darken('#4caf50', 0.1)
  },
  info: {
    contrastText: white,
    light: lighten('#88ffdd', 0.1),
    main: '#88ffdd',
    dark: darken('#88ffdd', 0.1)
  },
  warning: {
    contrastText: white,
    light: lighten('#ffae42', 0.1),
    main: '#ffae42',
    dark: darken('#ffae42', 0.1)
  },
  error: {
    contrastText: white,
    light: lighten('#d8000c', 0.1),
    main: '#d8000c',
    dark: darken('#d8000c', 0.1)
  },
  text: {
    primary: '#12161b',
    secondary: '#66788a',
    disabled: '#a6B1bb'
  },
  background: {
    default: white,
    dark: '#172b4d',
    paper: white
  },
  border: '#dfe3e8',
  divider: '#ccc'
};
