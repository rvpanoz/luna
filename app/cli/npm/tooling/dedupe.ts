/**
 * Searches the local package tree and attempts
 * to simplify the overall structure by moving dependencies further up the tree
 * https://docs.npmjs.com/cli/dedupe
 */

const dedupe = () => {
  const command = ['dedupe'];
  const defaults = ['--no-audit', '-verbose'];

  return command.concat(defaults);
};

export default dedupe;
