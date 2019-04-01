const prune = () => {
  const command = ['prune'];
  const defaults = ['--json'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default prune;
