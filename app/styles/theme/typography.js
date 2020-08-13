import palette from './palette';
import { defaultFont } from '../variables';

export default {
  useNextVariants: true,
  fontFamily: [
    'Regular',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: 35,
    letterSpacing: '-0.24px',
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: 30,
    letterSpacing: '-0.24px',
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: 24,
    letterSpacing: '-0.06px',
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: 20,
    letterSpacing: '-0.06px',
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: 16,
    letterSpacing: '-0.05px',
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: '-0.05px',
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: 16,
    letterSpacing: '-0.05px',
  },
  subtitle2: {
    color: palette.text.primary,
    fontSize: 14,
    letterSpacing: 0,
  },
  body1: {
    color: palette.text.primary,
    fontSize: 16,
    letterSpacing: '-0.05px',
  },
  body2: {
    color: palette.text.primary,
    fontSize: 14,
    letterSpacing: '-0.04px',
  },
  button: {
    color: palette.text.primary,
    fontSize: 14,
  },
  caption: {
    color: palette.text.secondary,
    fontSize: 12,
    letterSpacing: 0.3,
  },
};
