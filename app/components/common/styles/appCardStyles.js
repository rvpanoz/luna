import {
  defaultFont,
  infoColor,
  grayColor,
  defaultBoxShadow,
  flexContainer
} from 'styles/variables';

const styles = theme => ({
  card: {
    ...flexContainer,
    position: 'relative',
    width: '100%',
    margin: 0,
    padding: 0,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 3
  },
  cardHeader: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    textAlign: 'center',
    border: 0,
    borderRadius: 30
  },
  cardContent: {
    ...flexContainer,
    padding: theme.spacing.unit * 2,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardIcon: {
    fill: '#fff'
  },
  primaryCardHeader: {
    ...defaultBoxShadow,
    padding: 0,
    background: theme.palette.primary.light
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
  },
  cardAvatar: {
    margin: theme.spacing.unit
  },
  cardCategory: {
    ...defaultFont,
    color: grayColor,
    flexGrow: 2
  },
  cardDescription: {
    ...defaultFont,
    fontSize: '1.625em'
  },
  cardTitleSmall: {
    ...defaultFont,
    margin: 0,
    paddingTop: theme.spacing.unit,
    color: '#777'
  },
  cardActions: {
    display: 'flex',
    padding: theme.spacing.unit,
    padding: 0,
    margin: 0,
    borderTop: '1px solid #eeeeee',
    height: 'auto',
    ...defaultFont
  },
  cardStats: {
    lineHeight: 22,
    color: grayColor,
    fontSize: 12,
    display: 'inline-block',
    margin: '0!important'
  },
  cardStatsIcon: {
    position: 'relative',
    top: theme.spacing.unit / 2,
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2
  },
  cardStatsLink: {
    color: infoColor,
    textDecoration: 'none',
    ...defaultFont
  }
});

export default styles;
