export const dedupe = () => {
  const command = ['dedupe'];
  const defaults = ['--json', '--verbbose'];

  const run = [].concat(command).concat(defaults);
  return run;
};
