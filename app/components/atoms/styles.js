/**
 * CardInfo styles
 */

import {
  card,
  cardActions,
  cardHeader,
  defaultFont,
  greyColor
} from 'styles/variables';

export const detailsCardStyles = theme => ({
  card,
  cardContent: {
    textAlign: 'left',
    paddingTop: 20,
    padding: '15px 20px'
  },
  cardHeader: {
    minHeight: 100,
    ...cardHeader
  },
  card,
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
  cardTitle: {
    marginTop: '0',
    marginBottom: '5px',
    ...defaultFont,
    fontSize: '1.125em'
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: '0',
    margin: '0 0 10px'
  },
  cardActions: {
    padding: '14px',
    display: 'block',
    height: 'auto',
    ...cardActions
  },
  cardActionsText: {
    fontSize: 12,
    fontWeight: 100,
    color: greyColor
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
