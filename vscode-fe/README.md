



# vscode-fe    
   
Ethereum Fe language support for Visual Studio Code
https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/

Under heavy development( as Fe)

[Marketplace](https://marketplace.visualstudio.com/items?itemName=mjobuda.vscode-fe): `ext install mjobuda.vscode-fe`


Ypu need to have Fe installed to use this plugin.
https://github.com/ethereum/fe#getting-started

## Features

#### Passive Features

* Fe syntax and semantic coloring through Fe compiler's tokenizer(use the provided color theme for this)
* on hoover tips with information about ethereum's and Fe's builtin types and also hints about security concerns
* backgroung compilation

#### Active Features
* snippets

#### Active Killer Feature

* magical F4 key cycles between .fe sorce file, generated ast file, lowered ast, module.tokens, abi.jsons, yuls and bins. Set the fe.options to --overwrite --emit=yul if you want to debug only yul
* more to come!

