const cache = {};
const req = require.context('./', false, /\.js$/);

req
  .keys()
  .forEach(
    filename => {
      const moduleCached = cache[filename.replace(/\.\/|\.js/g, '')]

      return moduleCached.req(filename).default
    }
  );

export default cache;
