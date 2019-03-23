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

// /** npm tools */
// exports.audit = options => {
//   const command = ['audit'];
//   const { mode } = options || {};
//   const defaults = ['--parseable', '--json'];

//   const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

//   // build npm command
//   const run = [].concat(command).concat(commandArgs);

//   return run;
// };

// // https://docs.npmjs.com/cli/doctor.html
// exports.doctor = options => {
//   const command = ['doctor'];
//   const { mode } = options || {};
//   const defaults = ['--parseable', '--json'];

//   const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : [];

//   // build npm command
//   const run = [].concat(command).concat(commandArgs);

//   return run;
// };

// // @scope>/]<pkg>...] [--production] [--dry-run] [--json]
// exports.prune = options => {
//   const command = ['prune'];
//   const { mode } = options || {};
//   const defaults = ['--parseable', '--json'];

//   const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

//   // build npm command
//   const run = [].concat(command).concat(commandArgs);

//   return run;
// };
