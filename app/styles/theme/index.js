import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import props from './props';

const theme = createMuiTheme({
  palette,
  typography,
  overrides,
  props,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1440
    }
  },
  mixins: {
    toolbar: {
      minHeight: 56
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
