import install from './install';
import view from './view';
import update from './update';
import uninstall from './uninstall';
import { audit, doctor, prune, dedupe } from './tooling';

export default {
  install,
  uninstall,
  update,
  view,
  audit,
  doctor,
  prune,
  dedupe
};
