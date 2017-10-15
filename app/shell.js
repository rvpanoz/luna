//run shell commands

'use strict';

const cp = require('child_process');
const utils = require('./utils');
const spawn = cp.spawn;
const defaults = ['--depth=0', '--json'];

const execute = (command, callback) => {
  console.log(`running: npm ${command.join(' ')}`);
  let result = '';
  let npmc = spawn('npm', command, {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    result += data.toString();
    let dataToString = data.toString();
    callback(dataToString, 'reply');
  });

  npmc.stderr.on('data', (error) => {
    let errorToString = error.toString();
    console.log('ERROR: ' + errorToString);
    callback(errorToString, 'error');
  });

  npmc.on('close', () => {
    console.log(`finish: npm ${command.join(' ')}`);
    callback(result, 'close');
  });
}

/**
* Synopsis: Returns all the versions of packages that are installed,
  as well as their dependencies
* npm ls [[<@scope>/]<pkg> ...]
* aliases: list, la, ll
**/
exports.getPackages = (options, callback) => {
  const opts = options || {};
  const cmd = 'list';

  let result = '';
  let run = [cmd],
    params = [],
    args = [];

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}

/**
* Synopsis: Search the registry for packages matching the search terms
* npm search [-l|--long] [--json] [--parseable] [--no-description] [search terms ...]
* aliases: s, se, find
**/
exports.searchPackages = (options, callback) => {
  const opts = options || {}
  const cmd = 'search';

  let run = [cmd],
    params = [],
    args = [];
  let pkgName = opts.pkgName;
  let result = '';

  if (pkgName) {
    run.push(pkgName);
  } else {
    callback(1, 'searchPackages: Package name is missing.');
  }

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}

/**
* Synopsis: View registry info
* npm list [<@scope>/]<name>[@<version>] [<field>[.<subfield>]...]
* aliases: info, show, v
**/
exports.viewPackage = (options, callback) => {
  const opts = options || {}
  const cmd = 'view';

  let run = [cmd],
    params = [],
    args = [];
  let pkgName = opts.pkgName;
  let pkgVersion = opts.pkgVersion;
  let result = '';

  if (pkgName) {
    if (pkgVersion) {
      pkgName += "@" + pkgVersion;
    }
    run.push(pkgName);
  } else {
    callback(1, 'viewPackage: Package name is missing.');
  }

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}

/**
* Synopsis: This command installs a package, and any packages that it depends on.
* npm install [<@scope>/]<name>@<version>
* alias: npm i
**/
exports.installPackage = (options, callback) => {
  const opts = options || {}
  const cmd = 'install';

  let run = [cmd],
    params = [],
    args = [];
  let pkgName = opts.pkgName;
  let pkgVersion = opts.pkgVersion;
  let result = '';

  if (pkgName) {
    if (pkgVersion) {
      pkgName += "@" + pkgVersion;
    }
    run.push(pkgName);
  } else {
    callback(1, 'installPackage: Package name is missing.');
  }

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}

/**
* Synopsis: This command will update all the packages listed
* to the latest version.
* npm update [-g] [<pkg>...]
* aliases: up, upgrade
**/
exports.updatePackage = (options, callback) => {
  const opts = options || {}
  const cmd = 'update';

  let run = [cmd],
    params = [],
    args = [];
  let pkgName = opts.pkgName;
  let result = '';

  if (pkgName) {
    run.push(pkgName);
  } else {
    callback(1, 'installPackage: Package name is missing.');
  }

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}

exports.uninstallPackage = (options, callback) => {
  const opts = options || {}
  const cmd = 'uninstall';

  let run = [cmd],
    params = [],
    args = [];
  let pkgName = opts.pkgName;
  let result = '';

  if (pkgName) {
    run.push(pkgName);
  } else {
    callback(1, 'uninstallPackage: Package name is missing.');
  }

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}

//TODO
// npm outdated -g --depth=0
