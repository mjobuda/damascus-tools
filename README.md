# Damascus tools

## Tools for Fe. Monorepo. Check the philosophy of the project and write some issues/feature requests

### FeDocker

### Fejs

### Fewasm

### FePython

### FunctionExporterMacros

Rust macro lib that helps to build above targets.
Depending on the target it'll substitute some code
so that as many of the above plugins may be build from the same source.

### FeBrownie

### Solc\&Fe bundler(add

Will consist of a bundler which packs a small rust program,
one version of solc and one version of Fe.
The executable checks whether the --fe option is present.
Then it calls the Fe compiler with all the options(without the --fe).
Otherwise it calls the solc compiler with all options.
I have no name yet for this tool(lets call it here fsc).
The next action will be something like fsc complain "bla bla crashes bla".
This would send a crash report with the solc and fe versions.
We need this for creating the compatibility matrix.

### FeTruffle

### FeHighHat plugin

First somehow working release is using Fejs. Fejs is native compiled into node.
There are a few compatibility matrices for the used tools and libs, thus it does not seem to be a good solution.
Fewasm could be in future a good portable solution but lacks currently a working YUL compiler, thus no bytecode will be generated.
It should be possible to compile YUL with some wasm backend. Nor necessary in the webbrowser.
Vyper uses Docker, so FeDocker could be used. Also downloading of current Fe Compiler binaries is an option.
The plugin could use some stupid checks to decide what to use.
For instance putting all possible ways how to run different versions of different Fe, FeDocker, Fewasm, Fejs, Fe\* compilers.
Then run each with a -v to see which one won't crash. Or compile some contracts to see which one works best.

### FeAbstract

Concept: Common codebase for Fe plugins. Some code in FeHighHat,FeTruffle,FeBrownie,VScode,Remix might be duplicated.
The common part will be here. The Damascus build system will build all dependent tools from this.
This is another advantage of simplicity.

### VScode plugin

This story deserves an own blog entry!!!!

### Remix Plugin

idealy the VScode Plugin will work here without changes. Remix is based on Theia so it should be compatible.

### FeNanoIDE

A simple Code Editor in vanilla JS and HTML5 with basic IDE features and Fewasm built in.
The simplicity means that it can be easily exported to other targets that support some kind of WebView.
The simplicity and choice of Vanilla JS means that changes and exports will be easy and cheap(and hopefully stable\&fast).

### FeTizenTV

Exports FeNanoIDE Tizen TV

### FeGtags

This seems to be a good candidate for a common part of text editor plugins(or IDE plugins).

### FeCordova

Exports FeNanoIDE to Apple targets, Android and with some luck something else

### Damascus build system

one command should fetch a version of the Fe compiler(sources or binaries or both) and build all tools.
With one command!!!
