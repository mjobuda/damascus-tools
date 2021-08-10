# Damascus tools

A collection of ancient tools using nanotechnology

## Tools for Fe. Monorepo. Check the philosophy of the project.

## Feature requests welcome

### FeDocker 1

### FeDockerJs 0

JS wrapper around a shell call calling FeDocker.

### Fejs 1

A few functions from FE compiled to native as a JS library. Linux in my case. Works not on node 16.
Takes a string with Fe source code and returns tokens, bytecode, ast's ....

### Fewasm 1

Fejs compiled for wasm. It can be then used in the webbrowser.

### FePython 0

Fejs compiled for Python.

### FunctionExporterMacros 1

Rust macro lib that helps to build above targets.
Depending on the target it'll substitute some code
so that as many of the above plugins may be build from the same source.

### FeBrownie 0

### Solc\&Fe bundler 0

Two tools:
1\)

Will consist of a bundler which packs a small rust program,
one version of solc and one version of Fe.
The executable checks whether the --fe option is present.
Then it calls the Fe compiler with all the options(without the --fe).
Otherwise it calls the solc compiler with all options.
I have no name yet for this tool(lets call it here fsc).
The next action will be something like fsc complain "bla bla crashes bla".
This would send a crash report with the solc and fe versions.
We need this for creating the compatibility matrix.
How about ecc? Ethereum compiler collection!!

commandbundle --fe --FE .fe .Fe .FE --Fe /path/to/fe --cbdefault /path/to/solc
This command should generate an executable that
if launched with the --fe, --FE or --Fe parameter,
or if it is called on a file with the endings .fe, .Fe or .FE,
then it calls the Fe compiler with all other options from this commandline.
Otherwise the solc compiler is called.
The artifact of this tool should be somehow easily installable.

2.

something similar with json. This should be I think be written in node.
This will generate a wrapper, so that we can use json for the solc compiler.
But if somewhere in this json a "Fe" is indicated then the Fe compiler will be executed.
I'm not sure wether here a general approach makes sense.
It could be a javascript program that understands the solc json syntax and enhances it a little bit.
And it can also assemble the json output.

### FeTruffle 0

### FeHighHat plugin 1

First somehow working release is using Fejs. Fejs is native compiled into node.
There are a few compatibility matrices for the used tools and libs, thus it does not seem to be a good solution.
Fewasm could be in future a good portable solution but lacks currently a working YUL compiler, thus no bytecode will be generated.
It should be possible to compile YUL with some wasm backend. Nor necessary in the webbrowser.
Vyper uses Docker, so FeDocker could be used. Also downloading of current Fe Compiler binaries is an option.
The plugin could use some stupid checks to decide what to use.
For instance putting all possible ways how to run different versions of different Fe, FeDocker, Fewasm, Fejs, Fe\* compilers.
Then run each with a -v to see which one won't crash. Or compile some contracts to see which one works best.

### FeAbstract 0

Concept: Common codebase for Fe plugins. Some code in FeHighHat,FeTruffle,FeBrownie,VScode,Remix might be duplicated.
The common part will be here. The Damascus build system will build all dependent tools from this.
This is another advantage of simplicity.

### VScode plugin 1

This story deserves an own blog entry!!!!

### Remix Plugin 0

idealy the VScode Plugin will work here without changes. Remix is based on Theia so it should be compatible.

### FeNanoIDE 1

A simple Code Editor in vanilla JS and HTML5 with basic IDE features and Fewasm built in.
The simplicity means that it can be easily exported to other targets that support some kind of WebView.
The simplicity and choice of Vanilla JS means that changes and exports will be easy and cheap(and hopefully stable\&fast).

### FeTizenTV 0

Exports FeNanoIDE Tizen TV

### FeGtags 0

This could to be a good candidate for a common part of text editor plugins(or IDE plugins).
We can get tokens and AST's from Fe sourcecode. Semantic highliting is delivered by the Fe tokenizer(f.i. in the VScode plugin).
But I'm still looking for a simple(preferably non microsoft like) way to have IDE functionalities like "go to definition/declaration".

### FeCordova 0

Exports FeNanoIDE to Apple targets, Android and with some luck something else

### FeGhostIDE 0

FeNanoIDE available as a plugin for the ghost CMS.

### FeWPIDE 0

FeNanoIDE available as a plugin for the WordPress CMS.

### Damascus build system 1

One command should fetch a version of the Fe compiler(sources or binaries or both) and build all tools.
Zsh is used here as the main build system.
The build-all.zsh script calls in each folder the build.zsh script.

### GhosthubPublisher

Tool that contains a dockerized Ghost cms coupled with a
watch script that exports generated static html to your github pages.
Marketing can be an important aspect even of open source development.

### Bonus Wishlist Extra: Fe Debugger

I haven't estimated the difficulty of this task.

" Ethereum must remain a bazaar, and never become a cathedral. "
