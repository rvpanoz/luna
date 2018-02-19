import deepOrange from 'material-ui/colors/deepOrange'
import deepPurple from 'material-ui/colors/deepPurple'
import pink from 'material-ui/colors/pink'
import red from 'material-ui/colors/red'

export function appHeaderStyles(theme) {
  const drawerWidth = 240
  return {
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: theme.palette.secondary.dark
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerInner: {
      // Make the items inside not wrap when transitioning:
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerPaperClose: {
      width: 60,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing.unit
    },
    searchBoxLabel: {
      color: '#fff'
    },
    searchBoxInput: {
      width: 200,
      color: '#fff'
    },
    modeIcon: {
      margin: theme.spacing.unit + 10
    },
    mode: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: theme.spacing.unit + 15
    }
  }
}

export function appHeaderContentStyles() {
  return {
    iconHover: {
      '&:hover': {
        fill: 'rgb(225, 0, 80)'
      }
    }
  }
}

export function packagesListStyles(theme) {
  return {
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    heading: {
      margin: '1em 0 0.7em',
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.35417em'
    },
    avatar: {
      margin: 20
    },
    iconbutton: {
      position: 'relative',
      top: '15px',
      marginLeft: 'auto'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    lcontainer: {
      overflowY: 'auto'
    },
    list: {
      visibility: 'visible',
      overflowX: 'hidden',
      overflowY: 'auto',
      clear: 'both',
      maxHeight: '750px'
    }
  }
}

export function searchBoxStyles(theme) {
  return {
    root: {
      margin: '0 10px',
      padding: 0
    }
  }
}

export function packageCardStyles(theme) {
  return {
    root: {
      marginTop: 100
    },
    button: {
      margin: theme.spacing.unit
    },
    card: {
      maxWidth: '100%'
    },
    cardContent: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    collapseContent: {
      margin: theme.spacing.unit * 2
    },
    column: {
      flexBasis: '33.33%'
    },
    controls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: theme.spacing.unit,
      '& fieldset': {
        margin: theme.spacing.unit
      }
    },
    details: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    detailsAvatar: {
      marginTop: 15
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    },
    textField: {
      margin: theme.spacing.unit,
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: theme.spacing.unit / 4
    },
    description: {
      marginTop: 10
    },
    actions: {
      display: 'flex'
    },
    author: {
      flexGrow: 1
    },
    keywords: {
      flexGrow: 1,
      marginTop: 10
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      }),
      marginLeft: 'auto'
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    updated: {
      fontSize: 12,
      fontWeight: 300,
      color: theme.palette.primary.dark,
      margin: '1em 0 0.7em'
    },
    center: {
      position: 'absolute',
      top: '25%',
      left: '50%'
    },
    avatar: {
      backgroundColor: theme.palette.secondary.dark
    },
    heading: {
      color: 'rgba(0, 0, 0, 0.54)',
      margin: '1em 0 0.7em',
      fontSize: '1.1rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.35417em'
    },
    headingTail: {
      marginTop: 15
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    actions: {
      display: 'flex'
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      }),
      marginLeft: 'auto'
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    }
  }
}
