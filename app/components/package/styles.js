import pink from 'material-ui/colors/pink'

export function styles(theme) {
  return {
    card: {
      maxWidth: '100%'
    },
    cardContent: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    detailsAppBar: {
      maxHeight: 65
    },
    detailsTabs: {
      flexGrow: 1,
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.paper
    },
    collapseContent: {
      margin: theme.spacing.unit * 2
    },
    details: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    detailsAvatar: {
      marginTop: 15
    },
    chip: {
      color: '#fff',
      marginRight: '5px',
      marginTop: '5px'
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
      color: theme.palette.primary.light,
      margin: '1em 0 0.7em'
    },
    center: {
      position: 'absolute',
      top: '25%',
      left: '50%'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
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
      marginTop: 25
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
