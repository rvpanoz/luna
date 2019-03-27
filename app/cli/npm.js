/**
 * npm install [<@scope>/]<name>@<version>
 */

import install from './npm/install';
import view from './npm/view';
import uninstall from './npm/uninstall';
import update from './npm/update';
import { audit, doctor, prune, lockVerify } from './npm/tooling';

export default {
  doctor,
  prune,
  audit,
  doctor,
  install,
  view,
  update,
  uninstall
};
