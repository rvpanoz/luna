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
    paddingTop: 16,
    paddingBottom: 16
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    padding: 0,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    padding: theme.spacing.unit / 2
  },
  title: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.light
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
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
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  }
});

export default styles;
