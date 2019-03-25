import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

import { defaultFont, boxShadow } from 'styles/variables';

const buttonStyle = theme => ({
  button: {
    ...defaultFont,
    color: theme.palette.common.white,
    border: 'none',
    borderRadius: 5,
    position: 'relative',
    padding: theme.spacing.unit,
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: 0,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  },
  fullWidth: {
    width: '100%'
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    ...boxShadow,
    '&:hover': {
      backgroundColor: darken(theme.palette.primary.light, 0.1)
    }
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    ...boxShadow,
    '&:hover': {
      color: lighten(theme.palette.common.white, 0.3),
      backgroundColor: lighten(theme.palette.secondary.light, '0.15')
    }
  },
  error: {
    backgroundColor: theme.palette.error.main,
    ...boxShadow,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
      boxShadow:
        '0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)'
    }
  },
  simple: {
    '&,&:focus,&:hover': {
      color: theme.palette.secondary.light,
      background: 'transparent',
      boxShadow: 'none'
    }
  },
  transparent: {
    '&,&:focus,&:hover': {
      color: 'inherit',
      background: 'transparent',
      boxShadow: 'none'
    }
  },
  round: {
    borderRadius: 30
  },
  disabled: {
    opacity: '0.65',
    pointerEvents: 'none'
  }
});

export default buttonStyle;
