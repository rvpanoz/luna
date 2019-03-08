// ##############################
// // // SnackbarContent styles
// #############################

import {
  defaultFont,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow
} from 'styles/variables';

const styles = theme => ({
  info: {
    backgroundColor: '#00d3ee',
    color: '#ffffff',
    ...infoBoxShadow
  },
  success: {
    backgroundColor: '#5cb860',
    color: '#ffffff',
    ...successBoxShadow
  },
  warning: {
    backgroundColor: '#ffa21a',
    color: '#ffffff',
    ...warningBoxShadow
  },
  danger: {
    backgroundColor: '#f55a4e',
    color: '#ffffff',
    ...dangerBoxShadow
  },
  primary: {
    backgroundColor: '#af2cc5',
    color: '#ffffff',
    ...primaryBoxShadow
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 300
  },
  close: {
    width: '14px',
    height: '14px'
  },
  iconButton: {
    width: '24px',
    height: '24px'
  },
  icon: {
    display: 'block',
    left: '15px',
    position: 'absolute',
    top: '50%',
    marginTop: '-15px',
    width: '30px',
    height: '30px'
  },
  iconMessage: {
    paddingLeft: '65px',
    display: 'block'
  }
});

export default styles;
