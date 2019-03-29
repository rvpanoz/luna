const dedupe = () => {
  const command = ['dedupe'];
  const defaults = ['--json', '--verbose'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default dedupe;
