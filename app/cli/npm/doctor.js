/**
 * Run a set of checks to ensure your npm installation
 * https://docs.npmjs.com/cli/doctor
 */

const doctor = () => {
  const command = ['doctor'];
  const defaults = ['--json', '--verbose'];

  return command.concat(defaults);
};

export default doctor;
