import { createMuiTheme } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from './variables';

const theme = createMuiTheme({
  spacing: 8,
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3'
    },
    secondary: {
      light: lighten('#e51a90', 0.1),
      main: '#e51a90',
      dark: darken('#e51a90', 0.1)
    },
    error: {
      light: lighten('#D8000C', 0.1),
      main: '#D8000C',
      dark: darken('#D8000C', 0.1)
    },
    warning: {
      light: lighten('#ffae42', 0.1),
      main: '#ffae42',
      dark: darken('#ffae42', 0.1)
    },
    info: {
      light: lighten('#88ffdd', 0.1),
      main: '#88ffdd',
      dark: darken('#88ffdd', 0.1)
    },
    success: {
      light: lighten('#4caf50', 0.1),
      main: '#4caf50',
      dark: darken('#4caf50', 0.1)
    }
  },
  shape: {
    borderRadius: 8
  },
});

const appTheme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#fff'
      }
    },
    MuiButton: {
      label: {
        textTransform: 'initial'
      },
      contained: {
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.common.neutral
        },
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        }
      },
      outlined: {},
    },
    MuiTabs: {
      indicator: {
        height: 3,
      }
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
        minWidth: 0,
        height: '50px',
        fontWeight: 400,
        textTransform: 'none',
        fontSize: '14px',
        '@media (min-width: 960px)': {
          minWidth: '100px'
        },
        '&$selected': {
          fontWeight: 500
        }
      },
      label: {},
      labelContainer: {},
      textColorPrimary: {
        color: theme.palette.text.secondary
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854'
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

export default appTheme;
