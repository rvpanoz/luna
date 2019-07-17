/**
* Run a security audit
* https://docs.npmjs.com/cli/audit
*/

const audit = options => {
  const command = ['audit'];
  const defaults = ['--json'];
  const { flag } = options || {};
  const commandOptions = [];

  if (flag) {
    const argv = flag === 'fix' ? flag : `--${flag}`;

    commandOptions.push(argv);
  }

  return command.concat(commandOptions).concat(defaults);
};

export default audit;
