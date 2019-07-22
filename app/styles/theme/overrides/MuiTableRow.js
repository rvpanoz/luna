import palette from '../palette';
console.log(palette)
export default {
  root: {
    height: '46px',
    '&$selected': {
      backgroundColor: palette.background.neutral
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.warning.light,
      }
    }
  }
};
