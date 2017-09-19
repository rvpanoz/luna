/**
 * DEVELOPMENT MODE__
 */

import {
  app,
  remote,
  ipcRenderer
} from 'electron';

const path = require('path');
const cwd = process.cwd();
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
let rightClickPosition = null;

const menu = new Menu();
const menuItem = new MenuItem({
  label: 'Inspect Element',
  click: () => {
    remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
  }
});

//append menu item
menu.append(menuItem);

//register contextmenu event
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  rightClickPosition = {
    x: e.x,
    y: e.y
  }
  menu.popup(remote.getCurrentWindow());
}, false)
