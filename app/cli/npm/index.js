/* eslit-disable import/no-unresolved */

import install from './install';
import view from './view';
import update from './update';
import uninstall from './uninstall';
import audit from './audit';
import doctor from './doctor';
import prune from './tooling/prune';
import dedupe from './tooling/dedupe';
import verify from './tooling/verify';
import clean from './tooling/clean';
import init from './tooling/init';

export default {
  init,
  install,
  uninstall,
  update,
  view,
  audit,
  doctor,
  prune,
  dedupe,
  verify,
  clean
};
