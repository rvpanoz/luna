/**
 * CardInfo styles
 */

import {
  card,
  cardHeader,
  defaultFont,
  cardHeaderColor
} from 'styles/variables';

export const detailsCardStyles = theme => ({
  card,
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none'
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont
  },
  cardHeaderColor,
  cardTitle: {
    color: '#fff',
    marginTop: 0,
    marginBottom: theme.spacing.unit,
    fontSize: '1.125em',
    ...defaultFont
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: 0,
    color: 'rgba(255, 255, 255, 0.62)',
    margin: '0 0 10px'
  },
  cardActions: {
    padding: theme.spacing.unit * 1.5,
    display: 'block',
    height: 'auto'
  },
  cardDescription: {
    fontSize: '0.85em'
  },
  cardStats: {
    lineHeight: 22,
    fontSize: 12,
    display: 'inline-block',
    margin: 0
  },
  cardIcon: {
    position: 'relative',
    top: 4,
    color: theme.palette.primary.light,
    width: 16,
    height: 16
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
