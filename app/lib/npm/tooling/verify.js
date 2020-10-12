/**
 * Verify the contents of the cache folder, garbage collecting any unneeded data,
 * and verifying the integrity of the cache index and all cached data
 * https://docs.npmjs.com/cli/cache.html
 */

const verify = () => {
  const command = ['cache'];
  const defaults = ['verify'];

  return command.concat(defaults);
};

export default verify;
