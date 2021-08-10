'use strict';
/** 
 * @author github.com/tintinweb
 * @author Marek Owsikowski adapted for Fe
 * @license MIT
 * 
 * */


const vscode = require("vscode");
const settings = require("../settings");

class FeSignatureHelpProvider {
    provideSignatureHelp(document, position, token, context) {
        return new Promise((resolve, reject) => {
            position = position.translate(0, -1);
            let range = document.getWordRangeAtPosition(position);
            let name;
            if (!range) {
                return reject();
            }
            name = document.getText(range);
            console.log(name);
            console.log(context);

            //todo:
            return this.provideHover(
                this.languageClient,
                document,
                position,
                token,
            ).then(hover => this.hoverToSignatureHelp(hover, position, document));
        });
    }
    hoverToSignatureHelp(
        hover,
        position,
        document
    ) {
        const label = "blabla";
        const doc = "blablab funkcja bla bla";
        const si = new vscode.SignatureInformation(label, doc);
        si.parameters = [];

        const sh = new vscode.SignatureHelp();
        sh.signatures[0] = si;
        sh.activeSignature = 0;

        return sh;
    }
}

function init(context, type) {
    context.subscriptions.push(
        vscode.languages.registerSignatureHelpProvider(
            { language: settings.LANGUAGE_ID },
            new FeSignatureHelpProvider(),
            '(', ','
        )
    );
}

module.exports = {
    init: init
};
// module.exports = {
//     FeSignatureHelpProvider: FeSignatureHelpProvider
// };