import { flexContainer } from 'styles/variables';

const styles = theme => ({
  flexContainer: {
    ...flexContainer,
    alignItems: 'center'
  },
  flexItem: {
    padding: theme.spacing.unit
  },
  categoryHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    padding: theme.spacing.unit,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    padding: theme.spacing.unit / 2
  },
  homeIcon: {
    width: 35,
    height: 35,
    marginLeft: theme.spacing.unit * 2,
    fill: '#fff'
  },
  title: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActionable: {
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.light
    }
  },
  itemActiveItem: {
    color: theme.palette.primary.light
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {
    paddingTop: theme.spacing.unit / 2
  },
  divider: {
    marginTop: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  actionButton: {
    paddingTop: theme.spacing.unit
  }
});

export default styles;
