// ##############################
// // // PackageCard styles
// #############################

import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from './variables'

const packageCardStyles = (theme) => ({
  root: {
    width: '100%'
  },
  secondaryHeading: {
    margin: theme.spacing.unit + 15,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: '100%'
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  collapseContent: {
    margin: theme.spacing.unit * 2
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
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
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  details: {
    visibility: 'visible',
    width: '100%',
    maxHeight: 200,
    marginBottom: 20,
    overflowX: 'hidden',
    overflowY: 'auto'
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
  chip: {
    margin: theme.spacing.unit / 4
  },
  description: {
    marginTop: 10
  },
  listItem: {
    paddingLeft: 0
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
  innerList: {
    clear: 'both',
    visibility: 'visible',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  innerListLong: {
    maxHeight: '300px'
  },
  innerListSmall: {
    maxHeight: '200px'
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
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

export default packageCardStyles
