# Luna - NPM management application.

Luna is a tool for developers to organize npm packages.
You can **install**, **view**, **update**, **uninstall** your npm global packages or manage your packages from a local directory.

## Features

- Install new packages
- View package detail info
- Analyze package.json file
- Update existing packages
- Uninstall packages

![Luna](http://104.236.58.95/media/luna.png)

## Development ##

1. clone the repository
2. run `npm install` to install application's dependencies and devDependencies. 
(* if you get error **gyp WARN EACCES**, run `sudo npm install --allow-root` - maybe you have to delete the node_modules folders first.)
3. run `npm run dev`

### Debian based (Debian, Ubuntu, Linux Mint)

Luna is only available for 64-bit Linux systems.

1. Download [luna_1.0.0_amd64.deb](http://104.236.58.95/luna/releases/latest/luna_1.0.0_amd64.deb)
2. Run `sudo dpkg --install luna_1.0.0_amd64.deb` on the downloaded package.
3. Launch Luna

### Windows

Work in progress.. :)
