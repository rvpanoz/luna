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
    textAlign: 'center'
  },
  cardContent: {
    textAlign: 'right',
    paddingTop: '10px',
    padding: '15px 20px'
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
    fontSize: '65%',
    fontWeight: '400',
    lineHeight: '1',
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
