import palette from '../palette';

export default {
  label: {
    textTransform: 'initial'
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
