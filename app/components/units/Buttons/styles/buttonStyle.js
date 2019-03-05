// ##############################
// // // Button styles
// #############################

import {
  grayColor,
  infoColor,
  successColor,
  defaultFont,
  boxShadow
} from 'styles/variables';

const buttonStyle = theme => ({
  button: {
    ...defaultFont,
    color: theme.palette.common.white,
    border: 'none',
    borderRadius: 3,
    position: 'relative',
    padding: `${theme.spacing.unit * 1.35}px ${theme.spacing.unit * 3}px`,
    margin: 0,
    fontSize: 18,
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: 0,
    transition:
      'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    lineHeight: 0.75,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      boxShadow:
        '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)'
    }
  },
  fullWidth: {
    width: '100%'
  },
  primary: {
    ...boxShadow,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  info: {
    backgroundColor: infoColor,
    ...boxShadow,
    '&:hover': {
      backgroundColor: infoColor,
      boxShadow:
        '0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)'
    }
  },
  success: {
    backgroundColor: successColor,
    ...boxShadow,
    '&:hover': {
      backgroundColor: successColor,
      boxShadow:
        '0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)'
    }
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    ...boxShadow,
    '&:hover': {
      backgroundColor: theme.palette.warning.light,
      boxShadow:
        '0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)'
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
  white: {
    '&,&:focus,&:hover': {
      backgroundColor: theme.palette.common.white,
      color: grayColor
    }
  },
  simple: {
    '&,&:focus,&:hover': {
      color: theme.palette.error.light,
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
    borderRadius: '30px'
  },
  disabled: {
    opacity: '0.65',
    pointerEvents: 'none'
  }
});

export default buttonStyle;
