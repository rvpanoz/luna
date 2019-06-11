import cp from 'child_process';
import chalk from 'chalk';

const { NODE_ENV } = process.env;

const checkNpm = () => {
  try {
    const result = cp.execSync('npm config list --json');
    const env = JSON.parse(result.toString());

    if (NODE_ENV === 'development') {
      console.log(chalk.black.bgYellow.bold(`[INFO] ${env['user-agent']}`));
    }

    return {
      userAgent: env['user-agent'],
      metricsRegistry: env['metrics-registry'],
      auditLevel: env['audit-level'],
      nodeVersion: env['node-version'],
      cache: env.cache,
      prefix: env.prefix,
      shrinkWrap: env.shrinkWrap,
      logLevel: env.lockLevel
    };
  } catch (error) {
    throw new Error(error)
  }
};

export default checkNpm;
