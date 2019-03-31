const doctor = () => {
  const command = ['doctor'];
  const defaults = ['--json'];

  const run = [].concat(command).concat(defaults);
  return run;
};

export default doctor;
