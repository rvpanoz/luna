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
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: 0,
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: 5,
    color: theme.palette.common.black,
    background: theme.palette.common.white
  },
  cardHeader: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    color: infoColor,
    textAlign: 'center',
    borderRadius: 5,
    minHeight: 25
  },
  cardContent: {
    ...flexContainer,
    padding: theme.spacing.unit * 2,
    justifyContent: 'space-between',
    minHeight: 70
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
    color: grayColor,
    flexGrow: 0
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
