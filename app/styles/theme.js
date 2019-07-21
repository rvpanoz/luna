import { createMuiTheme } from '@material-ui/core/styles';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import { defaultFont } from './variables';

const theme = createMuiTheme({
  typography: {
    ...defaultFont,
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
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
  }
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
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
        margin: '0 16px',
        minWidth: 0,
        [theme.breakpoints.up('md')]: {
          minWidth: 0
        }
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit
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
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20
        }
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
