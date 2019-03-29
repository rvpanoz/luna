export const prune = () => {
  const command = ['prune'];
  const defaults = ['--json', '--verbose'];

  const run = [].concat(command).concat(defaults);

  return run;
};
