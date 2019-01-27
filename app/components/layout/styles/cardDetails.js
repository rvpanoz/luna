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

const cardInfoStyle = {
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
    paddingTop: 20,
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
  cardText: {
    marginBottom: '0',
    color: grayColor,
    margin: '0 0 10px',
    wordBreak: 'break-word',
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

export default cardInfoStyle;
