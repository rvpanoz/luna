/**
 * Styles that are used on more than one component
 */

const drawerWidth = 240;

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
};

const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto'
};

const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
};

const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: '3px',
  color: 'rgba(0, 0, 0, 0.87)',
  background: '#fff'
};

const defaultFont = {
  fontFamily: '"Regular", "Helvetica", "Arial", sans-serif',
  fontWeight: '200',
  lineHeight: '1.225em'
};

const primaryColor = '#9c27b0';
const secondaryColor = '#e51a94';
const warningColor = '#ff9800';
const dangerColor = '#f44336';
const successColor = '#4caf50';
const infoColor = '#00acc1';
const roseColor = '#e91e63';
const grayColor = '#999999';

const primaryBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)'
};
const infoBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)'
};
const successBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)'
};
const warningBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)'
};
const dangerBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)'
};

const orangeCardHeader = {
  background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
  ...warningBoxShadow
};
const greenCardHeader = {
  background: 'linear-gradient(60deg, #66bb6a, #43a047)',
  ...successBoxShadow
};
const redCardHeader = {
  background: 'linear-gradient(60deg, #ef5350, #e53935)',
  ...dangerBoxShadow
};
const blueCardHeader = {
  background: 'linear-gradient(60deg, #26c6da, #00acc1)',
  ...infoBoxShadow
};
const purpleCardHeader = {
  background: 'linear-gradient(60deg, #ab47bc, #8e24aa)',
  ...primaryBoxShadow
};

const flexContainer = {
  display: '-webkit-flex',
  justifyContent: 'space-around',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  WebkitFlexFlow: 'row wrap',
  position: 'relative'
};

const flexItem = {
  color: '#fff',
  height: '210px',
  margin: '10px 0',
  padding: '0',
  width: '225px',
  position: 'relative'
};

const flex_item_inner = {
  display: '-webkit-flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '210px',
  margin: '0',
  padding: '0',
  width: '100%'
};

const flex_item_inner_a = { color: '#fff', cursor: 'pointer' };

const cardActions = {
  margin: '0 20px 10px',
  paddingTop: '10px',
  borderTop: '1px solid #eeeeee',
  height: 'auto',
  ...defaultFont
};

const cardHeader = {
  margin: '-5px 15px 0',
  borderRadius: '3px',
  padding: '15px'
};

const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s'
};

export {
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  flexContainer,
  flexItem,
  flex_item_inner,
  flex_item_inner_a
};
