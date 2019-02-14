// check npm installation
import cp from 'child_process';
import chalk from 'chalk';

const { NODE_ENV } = process.env;

const checkNpm = () => {
  try {
    const result = cp.execSync('npm -v');
    const version = result.toString();

    if (NODE_ENV === 'development') {
      console.log(
        chalk.black.bgYellow.bold(`[INFO] found npm version ${version}`)
      );
    }

    return version;
  } catch (error) {
    throw new Error(error);
  }
};

export default checkNpm;
