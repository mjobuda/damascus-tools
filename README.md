# Damascus tools

## Tools for Fe. Monorepo. Check the philosophy of the project and write some issues/feature requests

### FeDocker

### Fejs

### Fewasm

### FePython

### FeBrownie


### Solc&Fe bundler(add 

### FeTruffle

### FeHighHat plugin
First somehow working release is using Fejs. Fejs is native compiled into node. 
There are a few compatibility matrices for the used tools and libs, thus it does not seem to be a good solution.
Fewasm could be in future a good portable solution but lacks currently a working YUL compiler, thus no bytecode will be generated.
It should be possible to compile YUL with some wasm backend. Nor necessary in the webbrowser.
Vyper uses Docker, so FeDocker could be used. Also downloading of current Fe Compiler binaries is an option.
The plugin could use some stupid checks to decide what to use.
For instance putting all possible ways how to run different versions of different Fe, FeDocker, Fewasm, Fejs, Fe* compilers.
Then run each with a -v to see which one won't crash. Or compile some contracts to see which one works best.

### FeAbstract
Concept: Common codebase for Fe plugins. Some code in FeHighHat,FeTruffle,FeBrownie,VScode,Remix might be duplicated.
The common part will be here.

### VScode plugin

### Remix Plugin
idealy the VScode Plugin will work here without changes.

### FeNanoIDE
A simple Code Editor in vanilla JS and HTML5 with basic IDE features and Fewasm built in.
The simplicity means that it can be easily exported to other targets that support some kind of WebView. 

### FunctionExporterMacros

### FeTizenTV
Exports FeNanoIDE Tizen TV

### FeGtags

### FeCordova
Exports FeNanoIDE to Apple targets, Android and with some luck something else

### Damascus build system
one command should fetch the Fe compiler(sources or binaries or both
