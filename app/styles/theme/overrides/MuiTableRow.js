import palette from '../palette';

export default {
  root: {
    '&$selected': {
      backgroundColor: palette.background.neutral
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.common.muted
      }
    }
  }
};
