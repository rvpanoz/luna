# Luna - NPM management application :boom:

Luna is a tool for developers to manage npm packages.
You can ***install***, ***view***, ***update***, ***uninstall*** your npm global packages or manage your packages from a local directory. Also the application has a notification system to inform you about missing dependencies and outdated packages.

if you want to help me make this software better and more useful feel free to add an issue or make a pull request. 

## Features

- Install new packages
- View package detail info
- Get notifications for missing dependencies
- Analyze package.json file
- Update existing packages
- Uninstall packages

![Luna - NPM management tool](http://104.236.58.95/media/luna-1.0.0-beta.png)

## Development ##

Luna is created with the ReactJS library, Redux for store management, Webpack 3 for bundling and Electron for building.

How to start developing:

1. clone the repository
2. run `npm install` to install application's dependencies and devDependencies. 
3. run `npm run dev`

if you are on linux and get error **gyp WARN EACCES**, run `sudo npm install --allow-root` - maybe you have to delete the node_modules folders first.

### Debian based (Debian, Ubuntu, Linux Mint)

1. Download [luna_1.1.0-beta_amd64.deb](http://104.236.58.95/luna/releases/latest/luna_1.1.0-beta_amd64.deb)
2. Run `sudo dpkg --install luna_1.1.0-beta_amd64.deb` on the downloaded package.
3. Launch Luna

### Windows

1. Download [luna_1.1.0-beta_x64.exe](http://104.236.58.95/luna/releases/latest/luna-1.1.0-beta_x64.exe)
2. Run `luna_1.1.0-beta_x64.exe`
3. Launch Luna

