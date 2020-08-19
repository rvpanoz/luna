import { grayColor, whiteColor, successColor } from 'styles/variables';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    width: 220,
    height: 115
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: 36,
    color: theme.palette.common.white,
    fontWeight: 700
  },
  value: {
    color: lighten(grayColor, 0.1),
    marginTop: theme.spacing(1)
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '50%',
    display: 'inline-flex',
    height: 64,
    justifyContent: 'center',
    marginLeft: 'auto',
    width: 64
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: 16,
    height: 32,
    width: 32
  },
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: grayColor,
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: whiteColor,
    margin: 0,
    fontSize: 20,
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0
  },
  cardTitle: {
    color: whiteColor,
    marginTop: 0,
    minHeight: "auto",
    marginBottom: theme.spacing(1),
    textDecoration: "none",
    "& small": {
      fontWeight: "400",
      lineHeight: "1"
    }
  }
});

export default styles