const audit = options => {
  const command = ['audit'];
  const defaults = ['--json'];
  let commandOptions;

  if (options.options && options.options.length) {
    commandOptions = defaults.concat(options.options);
  } else {
    commandOptions = defaults;
  }

  const run = [].concat(command).concat(commandOptions);
  return run;
};

export default audit;
