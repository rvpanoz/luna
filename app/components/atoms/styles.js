/**
 * CardInfo styles
 */

import {
  card,
  cardHeader,
  defaultFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardActions,
  grayColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  primaryColor,
  roseColor
} from 'styles/variables';

export const cardInfoStyles = {
  card,
  cardHeader: {
    ...cardHeader,
    float: 'left',
    textAlign: 'center'
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardContent: {
    textAlign: 'left',
    paddingTop: '10px',
    padding: '15px 20px'
  },
  cardIcon: {
    width: '40px',
    height: '36px',
    fill: '#fff'
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
    padding: '0!important'
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
  warningCardStatsIcon: {
    color: warningColor
  },
  primaryCardStatsIcon: {
    color: primaryColor
  },
  dangerCardStatsIcon: {
    color: dangerColor
  },
  successCardStatsIcon: {
    color: successColor
  },
  infoCardStatsIcon: {
    color: infoColor
  },
  roseCardStatsIcon: {
    color: roseColor
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: 'none',
    ...defaultFont
  },
  text: {
    width: '100%',
    position: 'relative',
    top: 5
  }
};

export const basicCardStyles = theme => ({
  root: {
    position: 'relative',
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
    boxShadow:
      '0 1px 1px 0 rgba(60, 64, 67, 0.08), 0 1px 3px 1px rgba(60, 64, 67, 0.16)',
    transition: 'box-shadow 0.25s',
    borderRadius: 2
  }
});
