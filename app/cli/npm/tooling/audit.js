/**
Run a security audit
https://docs.npmjs.com/cli/audit
 */

const audit = options => {
  const command = ['audit'];
  const defaults = ['--json'];
  let commandOptions;

  if (options.options && options.options.length) {
    commandOptions = defaults.concat(options.options);
  } else {
    commandOptions = defaults;
  }

  return command.concat(commandOptions);
};

export default audit;
