'use strict';
/** 
 * @author github.com/tintinweb
 * @license MIT
 * 
 * */
const vscode = require('vscode');

const styles = {
    foreGroundOk: vscode.window.createTextEditorDecorationType({
        dark: {
            color: "#84f56293",
        },
        light: {
            color: "#2a9b0e",
        },
        fontWeight: "bold"
    }),
    foreGroundWarning: vscode.window.createTextEditorDecorationType({
        dark: {
            color: "#f56262"
        },
        light: {
            color: "#d65353"
        },
        fontWeight: "bold",
    }),
    foreGroundWarningUnderline: vscode.window.createTextEditorDecorationType({
        dark: {
            color: "#f56262"
        },
        light: {
            color: "#d65353"
        },
        textDecoration: "underline"
    }),
    foreGroundInfoUnderline: vscode.window.createTextEditorDecorationType({
        dark: {
            color: "#ffc570"
        },
        light: {
            color: "#e4a13c"
        },
        textDecoration: "underline"
    }),
    foreGroundNewEmit: vscode.window.createTextEditorDecorationType({
        dark: {
            color: "#fffffff5",
        },
        light: {
            color: ""
        },
        fontWeight: "#c200b2ad"
    }),
    boldUnderline: vscode.window.createTextEditorDecorationType({
        fontWeight: "bold",
        textDecoration: "underline"
    }),
};

async function decorateWords(editor, decorules, decoStyle) {
    return new Promise(resolve => {
        if (!editor) {
            return;
        }
        var decos = [];
        const text = editor.document.getText();

        decorules.forEach(function (rule) {
            //var regEx = new RegExp("\\b" +word+"\\b" ,"g");
            var regEx = new RegExp(rule.regex, "g");
            let match;
            while (match = regEx.exec(text)) {
                var startPos = editor.document.positionAt(match.index);
                var endPos = editor.document.positionAt(match.index + match[rule.captureGroup].trim().length);
                //endPos.line = startPos.line; //hacky force
                var decoration = {
                    range: new vscode.Range(startPos, endPos),
                    hoverMessage: rule.hoverMessage
                };
                decos.push(decoration);
            }
        });
        editor.setDecorations(decoStyle, decos);
        resolve();
    });
}

function decorateEditor(activeEditor) {
    mod_deco = this;
    mod_deco.decorateWords(activeEditor, [
            {
                regex: "@\\b(pub|payable|mut)\\b",
                captureGroup: 0,
            },
            {
                regex: "\\b(send|raw_call|selfdestruct|raw_log|create_forwarder_to|blockhash)\\b",
                captureGroup: 0,
                hoverMessage: "❗**potentially unsafe** lowlevel call"
            },
        ], mod_deco.styles.foreGroundWarning);
        mod_deco.decorateWords(activeEditor, [
            {
                regex: "\\b(pub|payable|mut)\\b\\(",
                captureGroup: 1,
            },
        ], mod_deco.styles.foreGroundWarningUnderline);
        mod_deco.decorateWords(activeEditor, [
            {
                regex: "\\b(\\.balance|msg\\.[\\w]+|block\\.[\\w]+)\\b",
                captureGroup: 0,
            }
        ], mod_deco.styles.foreGroundInfoUnderline);
        mod_deco.decorateWords(activeEditor, [
            {
                regex: "@?\\b(pure|const|nonpayable|final)\\b",
                captureGroup: 0,
            },
        ], mod_deco.styles.foreGroundOk);
        mod_deco.decorateWords(activeEditor, [
            {
                regex: "\\b(log)\\.",
                captureGroup: 1,
            },
            {
                regex: "\\b(clear)\\b\\(",
                captureGroup: 1,
            },
        ], mod_deco.styles.foreGroundNewEmit);
        mod_deco.decorateWords(activeEditor, [
            {
                regex: "\\b(event|to_mem|__init__)\\b",
                captureGroup: 0,
            },
        ], mod_deco.styles.boldUnderline);
}

module.exports = {
    // decorateWords: decorateWords,
    decorateEditor: decorateEditor,
    styles: styles
};