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
    padding: theme.spacing.unit,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 5,
    color: theme.palette.common.black,
    background: theme.palette.common.white
  },
  cardHeader: {
    borderRadius: 5
  },
  cardContent: {
    padding: theme.spacing.unit
  },
  content: {
    ...flexContainer,
    padding: theme.spacing.unit / 2,
    justifyContent: 'space-between'
  },
  cardHeaderContent: {
    ...flexContainer,
    flexDirection: 'column',
    alignItems: 'flex-end',
    flexFlow: 'unset'
  },
  cardDirectory: {
    ...defaultFont,
    padding: theme.spacing.unit / 2
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
    color: grayColor,
    padding: theme.spacing.unit
  },
  font16: {
    fontSize: 16
  },
  font24: {
    fontSize: 24
  },
  cardDescription: {
    ...defaultFont
  },
  cardContentTitle: {
    ...defaultFont,
    position: 'relative',
    top: theme.spacing.unit / 2,
    color: grayColor,
    fontSize: 18
  },
  cardTitle: {
    ...defaultFont,
    color: theme.palette.common.white,
    marginTop: 0,
    marginBottom: 5,
    fontSize: 22
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: 0,
    color: 'rgba(255, 255, 255, 1.62)',
    margin: `0 0 ${theme.spacing.unit}px`
  },
  cardContentContext: {
    ...defaultFont,
    fontSize: 24
  },
  cardTitleSmall: {
    ...defaultFont,
    margin: 0,
    paddingTop: theme.spacing.unit,
    color: '#777'
  },
  cardActions: {
    ...flexContainer,
    justifyContent: 'space-between',
    padding: 0,
    borderTop: '1px solid #eeeeee'
  },
  cardStatsText: {
    position: 'relative',
    top: theme.spacing.unit / 2
  },
  cardStatsIcon: {
    position: 'relative',
    top: theme.spacing.unit / 2,
    left: theme.spacing.unit / 2,
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2
  },
  cardLink: {
    ...defaultFont,
    position: 'relative',
    top: theme.spacing.unit / 2,
    color: theme.palette.primary.main,
    textDecoration: 'none'
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
