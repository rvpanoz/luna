import chalk from 'chalk';
import detectPort from 'detect-port';

const port = process.env.PORT || '1211';

const CheckPortInUse = () =>
  detectPort(port, (error, availablePort) => {
    if (port !== String(availablePort)) {
      throw new Error(
        chalk.whiteBright.bgRed.bold(
          `Port "${port}" on "localhost" is already in use. Please use another port`
        )
      );
    } else {
      process.exit(0);
    }
  });

export default CheckPortInUse;
