import {
  card,
  cardActions,
  cardHeader,
  defaultFont,
  warningColor,
  dangerColor,
  infoColor,
  successColor,
  grayColor,
  flexContainer,
  flexItem
} from 'styles/variables';

export const detailsCardStyles = theme => ({
  card,
  flexContainer,
  flexItem,
  cardContent: {
    ...flexContainer,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: theme.spacing.unit * 2
  },
  cardPlain: {
    background: 'transparent',
    boxShadow: 'none'
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont,
    padding: theme.spacing.unit
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
  cardSubheader: {
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
    ...cardActions,
    display: 'flex',
    padding: theme.spacing.unit
  },
  cardIcon: {
    width: '20px',
    height: 'auto'
  },
  cardActionsText: {
    ...defaultFont,
    lineHeight: 'unset',
    fontWeight: 'inherit',
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

export const basicCardStyles = () => ({
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
    width: '20px',
    height: 'auto'
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
  },
  text: {
    width: '100%',
    position: 'relative',
    top: 5
  }
});
