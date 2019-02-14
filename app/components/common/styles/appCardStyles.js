import {
  card,
  cardActions,
  cardHeader,
  defaultFont,
  infoColor,
  grayColor,
  infoBoxShadow
} from 'styles/variables';

const styles = theme => ({
  card,
  cardHeader: {
    ...cardHeader,
    float: 'left',
    margin: theme.spacing.unit,
    textAlign: 'center'
  },
  cardContent: {
    textAlign: 'right',
    padding: '15px 20px',
    minHeight: 75
  },
  cardIcon: {
    width: '40px',
    height: '36px',
    fill: '#fff'
  },
  blueCardHeader: {
    background: theme.palette.primary.light,
    ...infoBoxShadow
  },
  cardAvatar: {
    margin: '8px'
  },
  cardCategory: {
    marginBottom: '0',
    color: grayColor,
    margin: '0 0 10px',
    ...defaultFont
  },
  cardTitle: {
    margin: '0',
    ...defaultFont,
    fontSize: '1.625em'
  },
  cardTitleSmall: {
    margin: 0,
    paddingTop: theme.spacing.unit,
    color: '#777'
  },
  cardActions: {
    ...cardActions,
    display: 'flex',
    padding: theme.spacing.unit
  },
  cardStats: {
    lineHeight: '22px',
    color: grayColor,
    fontSize: '12px',
    display: 'inline-block',
    margin: '0!important'
  },
  cardStatsIcon: {
    position: 'relative',
    top: '4px',
    width: '16px',
    height: '16px'
  },
  cardStatsLink: {
    color: infoColor,
    textDecoration: 'none',
    ...defaultFont
  }
});

export default styles;
