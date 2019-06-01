/**
* Run a security audit
* https://docs.npmjs.com/cli/audit
*/

const audit = options => {
  const command = ['audit'];
  const defaults = ['--json'];
  const { fix } = options || {};
  let commandOptions = defaults;

  if (fix) {
    commandOptions = [].concat(['fix'], defaults);
  }

  return command.concat(commandOptions);
};

export default audit;
