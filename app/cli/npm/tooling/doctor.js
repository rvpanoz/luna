const doctor = () => {
  const command = ['doctor'];
  const defaults = ['--json', '--verbose'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default doctor;
