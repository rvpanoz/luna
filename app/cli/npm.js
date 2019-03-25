/**
 * npm install [<@scope>/]<name>@<version>
 */

import install from './npm/install';
import view from './npm/view';
import uninstall from './npm/uninstall';
import update from './npm/update';

export default {
  install,
  view,
  update,
  uninstall
};
