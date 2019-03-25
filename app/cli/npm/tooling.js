// npm tooling

const audit = options => {
  const command = ['audit'];
  const defaults = ['--json', '--parseable'];
  const { fix } = options;

  const run = [].concat(command).concat(defaults);

  return run;
};

export { audit };
