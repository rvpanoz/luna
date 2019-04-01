const clean = () => {
  const command = ['cache'];
  const defaults = ['clean'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default clean;
