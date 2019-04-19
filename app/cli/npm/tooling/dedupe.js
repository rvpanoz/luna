const dedupe = () => {
  const command = ['dedupe'];
  const defaults = ['--json', '--verbose'];

  return command.concat(defaults);
};

export default dedupe;
