# hardhat-fe


[Hardhat](https://hardhat.org) plugin to develop smart contracts with Fe.

## What

This plugin adds support for Fe to Hardhat. Once installed, Fe contracts can be compiled by running the `compile` task.

This plugin generates the same artifact format as the built-in Solidity compiler, so that it can be used in conjunction with all other plugins.


## Installation


Then, you need to install the plugin by running

```bash
npm install --save-dev @berlinvege/hardhat-fe
```

And add the following statement to your `hardhat.config.js`:

```js
require("@berlinvege/hardhat-fe");
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```js
import "@berlinvege/hardhat-fe";
```

## Fe binary
This plugin is in development.
If you want to use the Fe binary from the release page(currently the suggested way),
then you have to:
- download the Fe binary from the official release page: https://github.com/ethereum/fe/releases
- create a file called `fe_path_name` in the same directory as your `hardhat.config.js`.
- write the path to the downloaded Fe binary into this file

Screenshot:
![fescreen](https://user-images.githubusercontent.com/14003621/131904025-bd2232ce-7a6e-44c8-859f-e848294061f5.png)


## Required plugins

No plugins dependencies.

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This plugin does not extend the Hardhat Runtime Environment.
## Usage

There are no additional steps you need to take for this plugin to work.
