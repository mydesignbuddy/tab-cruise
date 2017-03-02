# Tab Cruise

![Tab Cruise Logo](./app/images/icon-128.png)

A Chrome browser extension that automatically rotates current windows tabs when unattended. It functions alot like a screensaver. Prefect for a KIOSK, digital signage, digital agile boards or dashboard setups. *NOTE: This browser addon is not going to disable your OS's screensaver settings you must do that yourself :)*

Available on Google Chrome Store [https://chrome.google.com/webstore/detail/tab-cruise/hcdhhgmjcdacdogkopooepahclggnhae](https://chrome.google.com/webstore/detail/tab-cruise/hcdhhgmjcdacdogkopooepahclggnhae)

## Develop and Test

Run `npm install`

Then run `gulp --watch` and load the `dist`-directory into chrome.

## Tasks

### Build

`gulp`


| Option         | Description                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--watch`      | Starts a livereload server and watches all assets. <br>To reload the extension on change include `livereload.js` in your bundle.                      |
| `--production` | Minifies all assets                                                                                                                                   |
| `--verbose`    | Log additional data to the console.                                                                                                                   |
| `--vendor`     | Compile the extension for different vendors (chrome, firefox, opera)  Default: chrome                                                                 |
| `--sourcemaps` | Force the creation of sourcemaps. Default: !production                                                                                                |


### Package and Deploy/Submit to Addon Store

Zips your `dist` directory and saves it in the `packages` directory.

    $ gulp pack --vendor=firefox

### Version

Increments version number of `manifest.json` and `package.json`,
commits the change to git and adds a git tag.


    $ gulp patch      // => 0.0.X

or

    $ gulp feature    // => 0.X.0

or

    $ gulp release    // => X.0.0


## Globals

The build tool also defines a variable named `ENV` in your scripts. It will be set to `development` unless you use the `--production` option.


**Example:** `./app/background.js`

	if(ENV === 'development'){
		console.log('We are in development mode!');
	}







