export function parse(data, key, all) {
  let arr = [],
    packages;
  try {
    packages = JSON.parse(data);
    if (key && packages[key]) {
      packages = packages[key];
      return Object.keys(packages).map(pkey => packages[pkey]);
    }
    return [];
  } catch (error) {
    throw new Error(error);
  }
}
