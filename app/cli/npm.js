/**
 * npm install [<@scope>/]<name>@<version>
 */

import install from './npm/install';
import view from './npm/view';
import uninstall from './npm/uninstall';
import update from './npm/update';
import { audit } from './npm/tooling';

export default {
  audit,
  install,
  view,
  update,
  uninstall
};
