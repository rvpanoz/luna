const audit = () => {
  const command = ['audit'];
  const defaults = ['--json'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default audit;
