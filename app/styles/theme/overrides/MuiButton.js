import palette from '../palette';

export default {
  root: {
    padding: 10,
    color: palette.text.secondary,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)'
    }
  },
  outlined: {},
  label: {
    textTransform: 'initial'
  },
  contained: {
    backgroundColor: palette.common.white,
    '&:hover:not($disabled)': {
      backgroundColor: palette.text.secondary
    },
    '&:hover': {
      backgroundColor: palette.common.neutral
    },
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none'
    }
  }
};
