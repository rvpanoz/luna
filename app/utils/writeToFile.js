import fs from 'fs';

/**
 *
 * @param {*} fileName
 * @param {*} options
 */
const writeToFile = (fileName, data, flag = 'w') => {
  try {
    const content = fs.writeFileSync(fileName, data, {
      encoding: 'utf8',
      flag
    });

    return content;
  } catch (error) {
    throw new Error(error);
  }
};

export default writeToFile;
