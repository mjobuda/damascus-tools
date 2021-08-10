"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getFeTempOutputFolder = exports.activate = void 0;
var vscode = require("vscode");
var fs = require("fs");
var settings = require("./settings");
var tokenTypes = new Map();
var tokenModifiers = new Map();
var legend = (function () {
    // const tokenTypesLegend = [
    // 	'comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace',
    // 	'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function',
    // 	'method', 'macro', 'variable', 'parameter', 'property', 'label'
    // ];
    var tokenTypesLegend = [
        "Error",
        "Newline",
        /// Virtual tokens emitted by the parser
        "Indent",
        "Dedent",
        "Name",
        "Int",
        "Hex",
        "Octal",
        "Binary",
        // Float
        "Text",
        "True",
        "False",
        // None
        "Assert",
        "Break",
        "Continue",
        "Contract",
        "Def",
        "Const",
        "Elif",
        "Else",
        "Emit",
        "Event",
        "Idx",
        "If",
        "Import",
        "Pragma",
        "Pass",
        "For",
        "Pub",
        "Return",
        "Revert",
        "Struct",
        "Type",
        "While",
        "And",
        "As",
        "In",
        "Not",
        "Or",
        // Symbols
        "ParenOpen",
        "ParenClose",
        "BracketOpen",
        "BracketClose",
        "BraceOpen",
        "BraceClose",
        "Colon",
        "ColonColon",
        "Comma",
        "Semi",
        "Plus",
        "Minus",
        "Star",
        "Slash",
        "Pipe",
        "Amper",
        "Lt",
        "LtLt",
        "Gt",
        "GtGt",
        "Eq",
        "Dot",
        "Percent",
        "EqEq",
        "NotEq",
        "LtEq",
        "GtEq",
        "Tilde",
        "Hat",
        "StarStar",
        "StarStarEq",
        "PlusEq",
        "MinusEq",
        "StarEq",
        "SlashEq",
        "PercentEq",
        "AmperEq",
        "PipeEq",
        "HatEq",
        "LtLtEq",
        "GtGtEq",
        "Arrow"
    ];
    tokenTypesLegend.forEach(function (tokenType, index) { return tokenTypes.set(tokenType, index); });
    var tokenModifiersLegend = [
        'declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
        'modification', 'async'
    ];
    tokenModifiersLegend.forEach(function (tokenModifier, index) { return tokenModifiers.set(tokenModifier, index); });
    return new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
})();
function activate(context) {
    var dtp = new DocumentSemanticTokensProvider();
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'fe', scheme: 'file' }, dtp, legend));
}
exports.activate = activate;
function getLineNumberFromCharPos(text, pos) {
    if (pos == 0)
        return 0;
    var res = text.slice(0, pos);
    var lines = (res.match(/\n/g) || '').length;
    return lines;
}
function getFeTempOutputFolder() {
    return vscode.workspace.workspaceFolders[0].uri.path + '/' + '.vscode/fe_output';
}
exports.getFeTempOutputFolder = getFeTempOutputFolder;
function getTokenFileName() {
    return getFeTempOutputFolder() + "/module.tokens";
}
function getTokensFromTokenFile() {
    var lines;
    try {
        var fileName = getTokenFileName();
        lines = fs.readFileSync(fileName).toString();
    }
    catch (err) {
        console.error(err);
    }
    var ret = lines.split('Token').slice(1, -1);
    return ret;
}
function getTokenDataLine(text, documentText) {
    var start = Number(text.split('\n').slice(1, -2)[3].replace(/\s+/g, '').split(":")[1].replace(",", ""));
    var ret = getLineNumberFromCharPos(documentText, start);
    return ret;
}
function getTokenDataStartCharacter(text, documentText) {
    //nasty way to extract the data!!! you should change this
    var start = Number(text.split('\n').slice(1, -2)[3].replace(/\s+/g, '').split(":")[1].replace(",", ""));
    if (start == 0)
        return 0;
    var ret = documentText.slice(0, start).split('\n');
    if (ret.length == 1)
        return ret[0].length;
    return ret[ret.length - 1].length;
}
function getTokenDataLength(text) {
    //nasty way to extract the data!!! you should change this
    var start = Number(text.split('\n').slice(1, -2)[3].replace(/\s+/g, '').split(":")[1].replace(",", ""));
    var end = Number(text.split('\n').slice(1, -2)[4].replace(/\s+/g, '').split(":")[1].replace(",", ""));
    return end - start;
}
function getTokenDataTokenType(text) {
    var ret = text.split('\n').slice(1, -2)[0].replace(/\s+/g, '').split(":")[1].replace(",", "");
    return ret;
}
function getTokenDataTokenModifiers(text) {
    return [];
}
var DocumentSemanticTokensProvider = /** @class */ (function () {
    function DocumentSemanticTokensProvider() {
    }
    DocumentSemanticTokensProvider.prototype.provideDocumentSemanticTokens = function (document, token) {
        return __awaiter(this, void 0, void 0, function () {
            var moduleTokens, builder;
            var _this = this;
            return __generator(this, function (_a) {
                moduleTokens = getTokensFromTokenFile();
                builder = new vscode.SemanticTokensBuilder();
                moduleTokens.forEach(function (token) {
                    builder.push(getTokenDataLine(token, document.getText()), getTokenDataStartCharacter(token, document.getText()), getTokenDataLength(token), _this._encodeTokenType(getTokenDataTokenType(token)), _this._encodeTokenModifiers(getTokenDataTokenModifiers(token)));
                });
                return [2 /*return*/, builder.build()];
            });
        });
    };
    DocumentSemanticTokensProvider.prototype._encodeTokenType = function (tokenType) {
        if (tokenTypes.has(tokenType)) {
            return tokenTypes.get(tokenType);
        }
        else if (tokenType === 'notInLegend') {
            return tokenTypes.size + 2;
        }
        return 0;
    };
    DocumentSemanticTokensProvider.prototype._encodeTokenModifiers = function (strTokenModifiers) {
        var result = 0;
        for (var i = 0; i < strTokenModifiers.length; i++) {
            var tokenModifier = strTokenModifiers[i];
            if (tokenModifiers.has(tokenModifier)) {
                result = result | (1 << tokenModifiers.get(tokenModifier));
            }
            else if (tokenModifier === 'notInLegend') {
                result = result | (1 << tokenModifiers.size + 2);
            }
        }
        return result;
    };
    return DocumentSemanticTokensProvider;
}());
//# sourceMappingURL=tokenProvider.js.map