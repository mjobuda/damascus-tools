'use strict';
/** 
 * @author github.com/tintinweb
 * @license MIT
 * 
 * language definition based on: https://raw.githubusercontent.com/Microsoft/vscode/master/extensions/python/syntaxes/MagicPython.tmLanguage.json (MIT)
 * compilation related parts taken from: https://github.com/trufflesuite/truffle/tree/develop/packages/truffle-compile-fe (MIT)
 * */

/** imports */
const vscode = require("vscode");

const fejs =require("@berlinvege/fejs");

var path = require("path");
const fs = require('fs')
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;

const mod_deco = require("./features/deco.js");
const mod_signatures = require("./features/signatures.js");
const mod_hover = require("./features/hover/hover.js");
// const mod_compile = require("./features/compile.js");
const settings = require("./settings");
const tp = require("./tokenProvider.js");
/** global vars */
var activeEditor;

var outputFiles = [];
/** classdecs */


/** funcdecs */


/** event funcs */
async function onDidSave(document) {
    
    // vscode.window.showErrorMessage(document.fileName);
    if (document.fileName.endsWith('.git')){
        freshCompile(document.fileName.slice(0, -4));}
    else{
        freshCompile(document.fileName);}

}

async function onDidChange(event) {
    if (vscode.window.activeTextEditor.document.languageId != settings.LANGUAGE_ID) {
        return;
    }
    if (settings.extensionConfig().decoration.enable) {
        mod_deco.decorateEditor(vscode.window.activeTextEditor) ;
    }
}
function openFile(filePath) {
    const openPath = vscode.Uri.file(filePath);
    vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}



function getFilesFromDir(
    dir
) {
    var fileList = [];
    // const isDirectory = fs.statSync(dir).isDirectory();


    var files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = dir + '/' + file;
        const isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory) {
            fileList = fileList.concat(getFilesFromDir(filePath));
        }
        else {
            fileList.push(filePath);
        }


    });
    return fileList;
}

function getFeOutputFolder() {
    return vscode.workspace.workspaceFolders[0].uri.path + '/' + settings.extensionConfig().outputFolder;
}
function getFeCommand() {
    return settings.extensionConfig().command;
}
function compileAllinVS(fileName) {
    const fe_options = "--overwrite --emit=abi,bytecode,ast,tokens,yul,loweredAst";
    const outputFolder = tp.getFeTempOutputFolder();
    const rmCommand = "rm -rf " + outputFolder;
    if (fileName.endsWith('.git'))
        fileName = fileName.slice(0, -4);
        if (!fileName.endsWith('.fe')) return;
    const feCommand = getFeCommand()
        + " "
        + fileName + " " + fe_options + " "
        + "--output-dir " + outputFolder;
    const rmOutput = execSync(rmCommand).toString();
    try {
        execSync(feCommand);
    }
    catch (e) {
        vscode.window.showErrorMessage('[Compiler Exception] ' + e);
    }
}

function freshCompile(fileName) {
    vscode.window.showErrorMessage(fe.compile_to_ast(`contract Foo:

    pub def bar() -> u256:
        if true:
            y: u256 = 1
            return y
        else:
            y: u256 = 1
            return y`));
    compileAllinVS(fileName);
    const fe_options = settings.extensionConfig().options;
    if (fileName.endsWith('.git'))
        fileName = fileName.slice(0, -4);
        if (!fileName.endsWith('.fe')) return;
    const outputFolder = getFeOutputFolder();
    const rmCommand = "rm -rf " + outputFolder;
    const feCommand = getFeCommand()
        + " "
        + fileName + " " + fe_options + " "
        + "--output-dir " + outputFolder;
    execSync(rmCommand);
    try {
        execSync(feCommand);
    }
    catch (e) {
        vscode.window.showErrorMessage('[Compiler Exception] ' + e);
    }
    outputFiles = [fileName].concat(getFilesFromDir(outputFolder));

}
function onInitModules(context, lang) {
    mod_hover.init(context, lang);
    mod_signatures.init(context,lang);
    // mod_compile.init(context, lang);
}
function onActivate(context) {
    const ast = fejs.compileToASTStringFromFilename(vscode.window.activeTextEditor.document.fileName);
    console.log(ast);
    const active = vscode.window.activeTextEditor;
    activeEditor = active;
    let disposable = vscode.commands.registerCommand('fe.openAST', () => {
        var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
        var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
        if (currentlyOpenTabfileName.endsWith('.git'))
        {
            vscode.window.showErrorMessage('git git');
        currentlyOpenTabfileName = currentlyOpenTabfileName.slice(0, -4);
        }

        if (outputFiles.length != 0) {
            let ind = outputFiles.indexOf(currentlyOpenTabfilePath);
            if (ind != -1) {
                if (ind < outputFiles.length - 1) {
                    openFile(outputFiles[ind + 1]);
                }
                else {
                    openFile(outputFiles[0]);
                }
            }
        }


    });
    context.subscriptions.push(disposable);

    registerDocType(settings.LANGUAGE_ID);


    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.reg
        );
    }




    // taken from: https://github.com/Microsoft/vscode/blob/master/extensions/python/src/pythonMain.ts ; slightly modified
    // autoindent while typing
    vscode.languages.setLanguageConfiguration(settings.LANGUAGE_ID, {
        onEnterRules: [
            {
                beforeText: /^\s*(?:pub|struct|def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\s*$/,
                action: { indentAction: vscode.IndentAction.Indent }
            }
        ]
    });



    /** module init */
    onInitModules(context, settings.LANGUAGE_ID);
    onDidChange();
    onDidSave(active.document);

    /** event setup */
    /***** OnChange */
    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            onDidChange();
        }
    }, null, context.subscriptions);
    /***** OnChange */
    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            onDidChange(event);
        }
    }, null, context.subscriptions);
    /***** OnSave */

    vscode.workspace.onDidSaveTextDocument(document => {


        onDidSave(document);
        tp.activate(context);
    }, null, context.subscriptions);

    tp.activate(context);

    /****** OnOpen */
    vscode.workspace.onDidOpenTextDocument(document => {
        onDidSave(document);
    }, null, context.subscriptions);

    /***** SignatureHelper */
    
    // context.subscriptions.push(
    //     vscode.languages.registerSignatureHelpProvider(
    //         { language: settings.LANGUAGE_ID },
    //         new mod_signatures.FeSignatureHelpProvider(),
    //         '(', ','
    //     )
    // );
    


}

/* exports */
exports.activate = onActivate;
