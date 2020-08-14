/**
 * Create a package.json file
 * https://docs.npmjs.com/cli/npm-init
 */

const init = () => {
  const command = ['init'];
  const defaults = ['-y'];

  return command.concat(defaults);
};

export default init;
