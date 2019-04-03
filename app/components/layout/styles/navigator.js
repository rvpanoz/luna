import { grayColor, flexContainer, defaultFont } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  flexItem: {
    padding: theme.spacing.unit
  },
  categoryHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    borderBottom: '1px solid #eee'
  },
  categoryHeaderPrimary: {
    color: grayColor
  },
  itemCategory: {
    borderBottom: '1px solid #eee',
    padding: theme.spacing.unit / 2
  },
  homeIcon: {
    width: 35,
    height: 35,
    marginLeft: theme.spacing.unit * 2,
    fill: '#fff'
  },
  title: {
    ...defaultFont,
    color: grayColor,
    fontSize: 32,
    paddingLeft: theme.spacing.unit * 3
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
    paddingTop: theme.spacing.unit / 2
  },
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  actionButton: {
    paddingTop: 0
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
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
    padding: theme.spacing.unit,
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
    padding: theme.spacing.unit / 2
  }
});

export default styles;
