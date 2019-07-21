/**
 * Run a security audit
 * https://docs.npmjs.com/cli/audit
 */

const audit = params => {
  const command = ['audit'];
  const defaults = ['--json', '--verbose'];
  const { options: {
    flag
  } } = params || {}
  const commandOptions = [];

  if (flag) {
    const argv = flag === 'fix' ? flag : `fix --${flag}`;
    commandOptions.push(argv);
  }

  return command.concat(commandOptions).concat(defaults);
};

export default audit;
