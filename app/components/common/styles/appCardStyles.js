import {
  defaultFont,
  infoColor,
  grayColor,
  defaultBoxShadow,
  flexContainer,
  flexItem
} from 'styles/variables';

const styles = theme => ({
  flexItem: {
    ...flexItem,
    padding: theme.spacing.unit / 2
  },
  textRight: {
    textAlign: 'right'
  },
  textLeft: {
    textAlign: 'left'
  },
  card: {
    position: 'relative',
    width: '100%',
    margin: 0,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 5,
    color: theme.palette.common.black,
    background: theme.palette.common.white
  },
  cardHeader: {
    ...flexContainer,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    color: infoColor,
    textAlign: 'center',
    borderRadius: 5,
    minHeight: 25
  },
  cardContent: {
    padding: 0
  },
  content: {
    ...flexContainer,
    padding: theme.spacing.unit * 2,
    justifyContent: 'space-between'
  },
  cardHeaderContent: {
    ...flexContainer,
    flexDirection: 'column',
    alignItems: 'flex-end',
    flexFlow: 'unset'
  },
  cardIcon: {
    width: 25,
    height: 25,
    fill: theme.palette.common.white
  },
  cardAvatar: {
    margin: theme.spacing.unit
  },
  cardCategory: {
    ...defaultFont,
    fontSize: 20,
    color: grayColor
  },
  cardDescription: {
    ...defaultFont,
    fontSize: 24
  },
  cardTitle: {
    color: theme.palette.common.white,
    marginTop: 0,
    marginBottom: 5,
    ...defaultFont,
    fontSize: 18
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: 0,
    color: 'rgba(255, 255, 255, 1.62)',
    margin: `0 0 ${theme.spacing.unit}px`
  },
  cardTitleSmall: {
    ...defaultFont,
    margin: 0,
    paddingTop: theme.spacing.unit,
    color: '#777'
  },
  cardActions: {
    ...flexContainer,
    ...defaultFont,
    justifyContent: 'flex-end',
    padding: theme.spacing.unit / 1.5,
    borderTop: '1px solid #eeeeee',
    height: 'auto'
  },
  cardStatsIcon: {
    position: 'relative',
    top: theme.spacing.unit / 2,
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2
  },
  cardLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    ...defaultFont
  },
  primaryIcon: {
    color: theme.palette.primary.light
  },
  secondaryIcon: {
    color: theme.palette.secondary.light
  },
  warningIcon: {
    color: theme.palette.warning.light
  },
  errorIcon: {
    color: theme.palette.error.light
  },
  primaryCardHeader: {
    background: theme.palette.primary.light,
    ...defaultBoxShadow
  },
  secondaryCardHeader: {
    background: theme.palette.secondary.light,
    ...defaultBoxShadow
  },
  warningCardHeader: {
    background: theme.palette.warning.light,
    ...defaultBoxShadow
  },
  errorCardHeader: {
    background: theme.palette.error.light,
    ...defaultBoxShadow
  }
});

export default styles;
