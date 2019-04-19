const prune = () => {
  const command = ['prune'];
  const defaults = ['--json'];

  return command.concat(defaults);
};

export default prune;
