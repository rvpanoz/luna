/**
 * CardInfo styles
 */

import {
  card,
  cardActions,
  cardHeader,
  defaultFont,
  warningColor,
  dangerColor,
  infoColor,
  successColor,
  grayColor
} from 'styles/variables';

export const detailsCardStyles = theme => ({
  card,
  cardContent: {
    padding: theme.spacing.unit * 2
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none'
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont
  },
  cardPlainHeader: {
    marginLeft: 0,
    marginRight: 0
  },
  cardDescription: {
    ...defaultFont
  },
  cardTitle: {
    margin: 0,
    padding: theme.spacing.unit,
    ...defaultFont,
    fontSize: '1.225em'
  },
  cardSubtitle: {
    ...defaultFont,
    fontSize: '1.1em',
    marginBottom: '0',
    margin: '0 10px 10px'
  },
  cardHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardActions: {
    display: 'flex',
    padding: theme.spacing.unit,
    height: 'auto',
    ...cardActions
  },
  cardIcon: {
    width: '20px',
    height: 'auto'
  },
  cardActionsText: {
    ...defaultFont,
    fontSize: '0.85em'
  },
  cardAvatar: {
    maxWidth: '130px',
    maxHeight: '130px',
    margin: '-50px auto 0',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  img: {
    width: '50px',
    height: 'auto',
    verticalAlign: 'middle',
    border: '0'
  },
  warningCardIcon: {
    color: warningColor
  },
  dangerCardIcon: {
    color: dangerColor
  },
  successCardIcon: {
    color: successColor
  },
  infoCardIcon: {
    color: infoColor
  },
  grayCardIcon: {
    color: grayColor
  }
});

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
