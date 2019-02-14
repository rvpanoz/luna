// check npm installation
import cp from 'child_process';

const checkNpm = () => {
  try {
    const result = cp.execSync('npm -v');
    const version = result.toString();

    if (NODE_ENV === 'development') {
      console.log(
        chalk.black.bgYellow.bold(`[INFO] found npm version ${version}`)
      );
    }

    console.log(version);
  } catch (error) {
    console.log('npm-error');
  }
};

export default checkNpm;
