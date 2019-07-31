/* eslint-disable prefer-template */

/**
 * Styles that are used on more than one component
 */

const drawerWidth = 275;

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
};

const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto'
};

/** fonts */
const defaultFont = {
  fontFamily: '"Regular", "Roboto", cursive, sans-serif',
  fontWeight: 200,
  lineHeight: '1.25em'
};

/* colors */
const grayColor = '#999999';
const blackColor = '#000';
const whiteColor = '#fff';
const primaryColor = ['#009be5', '#009be5', '#009be5', '#009be5'];
const warningColor = ['#ffa726', '#ffa726', '#ffa726', '#ffa726'];
const dangerColor = ['#f44336', '#f44336', '#f44336', '#f44336'];
const successColor = ['#4caf50', '#66bb6a', '#43a047', '#5cb860'];
const infoColor = ['#00acc1', '#26c6da', '#00acc1', '#00d3ee'];

/* flexbox */
const flexContainer = {
  display: 'flex',
  margin: 0,
  padding: 0,
  flexFlow: 'row wrap'
};

/* box shadows */
const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
};

const primaryBoxShadow = {
  boxShadow:
    '0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)'
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

const defaultBoxShadow = {
  boxShadow:
    '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
};

const warningCardHeader = {
  background:
    'linear-gradient(60deg, ' + warningColor[1] + ', ' + warningColor[2] + ')',
  ...warningBoxShadow
};
const successCardHeader = {
  background:
    'linear-gradient(60deg, ' + successColor[1] + ', ' + successColor[2] + ')',
  ...successBoxShadow
};
const dangerCardHeader = {
  background:
    'linear-gradient(60deg, ' + dangerColor[1] + ', ' + dangerColor[2] + ')',
  ...dangerBoxShadow
};
const infoCardHeader = {
  background:
    'linear-gradient(60deg, ' + infoColor[1] + ', ' + infoColor[2] + ')',
  ...infoBoxShadow
};
const primaryCardHeader = {
  background:
    'linear-gradient(60deg, ' + primaryColor[1] + ', ' + primaryColor[2] + ')',
  ...primaryBoxShadow
};

export {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  drawerWidth,
  transition,
  container,
  boxShadow,
  defaultFont,
  successColor,
  infoColor,
  grayColor,
  whiteColor,
  blackColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  defaultBoxShadow,
  flexContainer
};
