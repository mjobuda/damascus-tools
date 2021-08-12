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

## Required plugins

No plugins dependencies.

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This plugin does not extend the Hardhat Runtime Environment.
## Usage

There are no additional steps you need to take for this plugin to work.
