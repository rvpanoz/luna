const doctor = () => {
  const command = ['doctor'];
  const defaults = ['--json'];

  return command.concat(defaults);
};

export default doctor;
