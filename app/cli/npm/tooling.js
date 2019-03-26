// npm tooling

const audit = options => {
  const command = ['audit'];
  const defaults = ['--json', '--parseable'];
  const { fix } = options;

  const run = [].concat(command).concat(defaults);

  return run;
};

const doctor = options => {
  const command = ['doctor'];
  const defaults = ['--json', '--parseable'];

  const run = [].concat(command).concat(defaults);

  return run;
};

const prune = options => {
  const command = ['prune'];
  const defaults = ['--json', '--parseable'];

  const run = [].concat(command).concat(defaults);

  return run;
};

const lockVerify = options => {
  // TODO..
};

export { audit, doctor, prune, lockVerify };
