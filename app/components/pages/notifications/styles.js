import { defaultFont, successColor, primaryBoxShadow } from 'styles/variables';

const styles = theme => ({
  root: {
    width: '100%',
    margin: 0,
    padding: theme.spacing.unit,
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      maxHeight: 500
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 650
    }
  },
  avatar: {
    color: theme.palette.secondary.light
  },
  errorIcon: {
    color: theme.palette.common.white
  },
  warningIcon: {
    color: theme.palette.common.white
  },
  errorAvatar: {
    backgroundColor: theme.palette.error.light
  },
  successAvatar: {
    backgroundColor: successColor
  },
  warningAvatar: {
    backgroundColor: theme.palette.warning.light
  }
});

export default styles;
