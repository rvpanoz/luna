import { execSync } from 'child_process';
import chalk from 'chalk';
import log from 'electron-log';

const { NODE_ENV } = process.env;

const checkNpm = async () => {
  try {
    const result = await execSync('npm config list --json');
    const env = JSON.parse(result.toString());

    if (NODE_ENV === 'development') {
      log.log(chalk.yellowBright.bold(`[INFO] ${env['user-agent']}`));
    }

    return {
      ...env,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export default checkNpm;
