import palette from '../palette';

import { lighten, darken } from '@material-ui/core/styles/colorManipulator';

export default {
  root: {
    '&$selected': {
      backgroundColor: lighten(palette.common.gray, 0.1),
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.common.gray,
      },
    },
  },
};
