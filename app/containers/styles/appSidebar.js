import { grayColor, flexContainer, defaultFont } from 'styles/variables';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  flexItem: {
    padding: theme.spacing(1)
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid #eee'
  },
  categoryHeaderPrimary: {
    color: grayColor
  },
  itemCategory: {
    borderBottom: '1px solid #eee',
    padding: theme.spacing(0.5)
  },
  homeIcon: {
    width: 35,
    height: 35,
    marginLeft: theme.spacing(2),
    fill: theme.palette.common.white
  },
  updateIcon: {
    color: lighten(theme.palette.primary.main, 0.2),
    marginRight: theme.spacing(0.5)
  },
  title: {
    ...defaultFont,
    color: grayColor,
    fontSize: 32,
    paddingLeft: theme.spacing(3)
  },
  itemActionable: {
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.light
    }
  },
  itemActiveItem: {
    color: theme.palette.primary.light
  },
  itemPrimary: {
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {
    paddingTop: theme.spacing(0.5)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  historyDirectory: {
    wordWrap: 'break-word'
  },
  label: {
    ...defaultFont,
    top: 0,
    fontSize: 22,
    fontWeight: 400,
    display: 'inline-block',
    position: 'relative'
  },
  listWrapper: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(1),
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      maxHeight: 500,
      overflowY: 'scroll'
    },
    [theme.breakpoints.up('lg')]: {
      overflowY: 'scroll',
      maxHeight: 650
    }
  },
  listItem: {
    ...defaultFont
  },
  listItemHalfPadding: {
    ...defaultFont,
    padding: theme.spacing(0.5)
  },
  card: {
    width: 268,
    minHeight: 150
  },
  cardTitle: {
    ...defaultFont,
    fontSize: 20,
    paddingBottom: theme.spacing(1)
  },
  cardFlexContainer: {
    ...flexContainer,
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    alignItems: 'center'
  },
  cardFlexContainerInner: {
    ...flexContainer,
    alignItems: 'center'
  },
  cardLabel: {
    ...defaultFont,
    fontSize: 12,
    color: darken(grayColor, 0.5)
  },
  dialog: {
    minHeight: 200
  }
});

export default styles;
