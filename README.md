# Luna - NPM management Electron application v2:boom:

---

<img align="center" width="100%" height="100%"
     title="luna-icon" src="./luna.jpg">

## Description

Luna is an electron app for developers for handling npm packages.

## Features

* Manage global packages
* Analyze local directory using package.json
* Install new packages
* Update existing packages
* Uninstall packages
* View package detail info
* Search npm for new packages
* Get notifications for missing dependencies
* Visualization of package details

<img align="center" width="100%" height="100%"
     title="luna-icon" src="./luna-ui.png">

Luna is alive thanks to these great libs and tools:

1. Electron _https://electronjs.org/_
2. ReactJS _https://reactjs.org/_
3. Redux _https://redux.js.org/_
4. Material-ui _https://material-ui-next.com/_
5. Webpack _https://github.com/webpack/webpack_

## Downloads

### Linux based systems

1. Debian [download](http://104.236.58.95/luna/releases/v200/luna_2.0.0_amd64.deb)
2. AppImage [download](http://104.236.58.95/luna/releases/v200/luna-2.0.0-x86_64.AppImage)

### Windows

Setup [download](http://104.236.58.95/luna/releases/v200/luna_setup_2.0.0.exe)

### macOS

Work in progress.. help wanted

## Development

1. clone the repository
2. run `npm install` to install application's dependencies and devDependencies.
3. run `npm run dev`

if you are on linux and get error **gyp WARN EACCES**, run `sudo npm install --allow-root`
maybe you have to delete the node_modules folders first.

## Notes

_If you have installed the previous version v1.2.0 you have to remove the node_modules folder and make a clean npm install. Previous version 1.2.0 codebase is now on `UI/bootstrap branch`._

For the previous version of the application you can use the **UI/bootstrap branch**
You have to remove the node_modules folder and run a clean install then use:

`git checkout UI/bootstrap`

`npm install`

if you encounter permission problems on Linux try:

`sudo npm install --allow-root`
