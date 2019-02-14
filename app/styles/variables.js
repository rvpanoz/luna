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

const defaultFont = {
  fontFamily: '"Regular", "Roboto", "Comic Sans MS", Arial", sans-serif',
  fontWeight: 200,
  lineHeight: '1.25em'
};

const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s'
};

/* colors */
const successColor = '#4caf50';
const infoColor = '#00acc1';
const grayColor = '#999999';

/* flexbox */
const flexContainer = {
  display: '-webkit-flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  WebkitFlexFlow: 'row wrap',
  position: 'relative'
};

const flexItem = {
  margin: 0,
  padding: 0,
  position: 'relative'
};

const flexItemInner = {
  display: '-webkit-flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '210px',
  margin: '0',
  padding: '0',
  width: '100%'
};

/* cards */
const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: 0,
  padding: 0,
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: 3,
  color: 'rgba(0, 0, 0, 0.87)'
};

const cardActions = {
  padding: 0,
  margin: 0,
  borderTop: '1px solid #eeeeee',
  height: 'auto',
  ...defaultFont
};

const cardHeader = {
  padding: 0
};

/* box shadows */
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

export {
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  successColor,
  infoColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  flexContainer,
  flexItem,
  flexItemInner
};
