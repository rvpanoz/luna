import palette from '../palette';

export default {
  label: {
    textTransform: 'initial'
  },
  outlined: {
    padding: '3px 16px'
  },
  contained: {
    backgroundColor: palette.common.white,
    '&:hover': {
      backgroundColor: palette.common.neutral
    },
    boxShadow: 'none',
    '&:active': {
      boxShadow: 'none'
    }
  }
};
