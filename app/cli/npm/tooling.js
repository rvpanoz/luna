// npm tooling

const audit = () => {
  const command = ['audit'];
  const defaults = ['--json'];

  const run = [].concat(command).concat(defaults);

  return run;
};

const doctor = () => {
  const command = ['doctor'];
  const defaults = ['--json'];

  const run = [].concat(command).concat(defaults);

  return run;
};

const prune = () => {
  const command = ['prune'];
  const defaults = ['--json'];

  const run = [].concat(command).concat(defaults);

  return run;
};

const dedupe = () => {
  const command = ['dedupe'];

  const run = [].concat(command);
  return run;
};

export { audit, doctor, prune, dedupe };
