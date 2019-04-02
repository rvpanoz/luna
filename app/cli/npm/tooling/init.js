const init = () => {
  const command = ['init'];
  const defaults = ['-y'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default init;
