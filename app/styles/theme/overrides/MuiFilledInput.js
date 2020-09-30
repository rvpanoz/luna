import palette from '../palette';

export default {
  root: {
    backgroundColor: palette.background.default,
    '&:hover': {
      backgroundColor: palette.primary.light,
    },
    '&$focused': {
      backgroundColor: palette.primary.light,
    },
  },
};
