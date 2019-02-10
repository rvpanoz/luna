// ##############################
// // // Button styles
// #############################

import {
  grayColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  defaultFont
} from 'styles/variables';

const buttonStyle = theme => {
  console.log(theme);
  return {
    button: {
      ...defaultFont,
      color: theme.palette.common.black,
      border: 'none',
      borderRadius: '3px',
      position: 'relative',
      padding: `${theme.spacing.unit * 1.5}px ${theme.spacing.unit * 3}px`,
      margin: theme.spacing.init,
      fontSize: '12px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: 0,
      transition:
        'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      lineHeight: '0.75',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      cursor: 'pointer',
      '&:hover': {
        color: '#fff',
        backgroundColor: theme.palette.secondary.light,
        boxShadow:
          '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)'
      }
    },
    fullWidth: {
      width: '100%'
    },
    info: {
      backgroundColor: infoColor,
      boxShadow:
        '0 2px 2px 0 rgba(0, 188, 212, 0.14), 0 3px 1px -2px rgba(0, 188, 212, 0.2), 0 1px 5px 0 rgba(0, 188, 212, 0.12)',
      '&:hover': {
        backgroundColor: infoColor,
        boxShadow:
          '0 14px 26px -12px rgba(0, 188, 212, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)'
      }
    },
    success: {
      backgroundColor: successColor,
      boxShadow:
        '0 2px 2px 0 rgba(76, 175, 80, 0.14), 0 3px 1px -2px rgba(76, 175, 80, 0.2), 0 1px 5px 0 rgba(76, 175, 80, 0.12)',
      '&:hover': {
        backgroundColor: successColor,
        boxShadow:
          '0 14px 26px -12px rgba(76, 175, 80, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(76, 175, 80, 0.2)'
      }
    },
    warning: {
      backgroundColor: warningColor,
      boxShadow:
        '0 2px 2px 0 rgba(255, 152, 0, 0.14), 0 3px 1px -2px rgba(255, 152, 0, 0.2), 0 1px 5px 0 rgba(255, 152, 0, 0.12)',
      '&:hover': {
        backgroundColor: warningColor,
        boxShadow:
          '0 14px 26px -12px rgba(255, 152, 0, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(255, 152, 0, 0.2)'
      }
    },
    danger: {
      color: '#fff',
      backgroundColor: dangerColor,
      boxShadow:
        '0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12)',
      '&:hover': {
        backgroundColor: dangerColor,
        boxShadow:
          '0 14px 26px -12px rgba(244, 67, 54, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)'
      }
    },
    white: {
      '&,&:focus,&:hover': {
        backgroundColor: '#fff',
        color: grayColor
      }
    },
    simple: {
      '&,&:focus,&:hover': {
        color: '#fff',
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
  };
};
export default buttonStyle;
