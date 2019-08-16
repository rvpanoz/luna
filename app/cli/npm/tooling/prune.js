/**
* Remove extraneous packages
* https://docs.npmjs.com/cli/prune.html
*/

const prune = () => {
  const command = ['prune'];
  const defaults = ['--json'];

  return command.concat(defaults);
};

export default prune;
