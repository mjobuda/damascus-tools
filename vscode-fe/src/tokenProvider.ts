import * as vscode from 'vscode';
import * as fs from 'fs';
import { EndOfLineState, TokenClass } from 'typescript';
const settings = require("./settings");

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

const legend = (function () {
	// const tokenTypesLegend = [
	// 	'comment', 'string', 'keyword', 'number', 'regexp', 'operator', 'namespace',
	// 	'type', 'struct', 'class', 'interface', 'enum', 'typeParameter', 'function',
	// 	'method', 'macro', 'variable', 'parameter', 'property', 'label'
	// ];
	const tokenTypesLegend = [
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
	tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));

	const tokenModifiersLegend = [
		'declaration', 'documentation', 'readonly', 'static', 'abstract', 'deprecated',
		'modification', 'async'
	];
	tokenModifiersLegend.forEach((tokenModifier, index) => tokenModifiers.set(tokenModifier, index));

	return new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
})();

export function activate(context: vscode.ExtensionContext) {
	var dtp = new DocumentSemanticTokensProvider();
	context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'fe', scheme: 'file' }, dtp, legend));
}

interface IParsedToken {
	line: number;
	startCharacter: number;
	length: number;
	tokenType: string;
	tokenModifiers: string[];
}

function getLineNumberFromCharPos(text, pos) {
	if (pos==0) return 0
	const res = text.slice(0, pos);
	const lines = (res.match(/\n/g) || '').length 
	return lines;
}

export function getFeTempOutputFolder() {
	return vscode.workspace.workspaceFolders[0].uri.path + '/' + '.vscode/fe_output';
}
function getTokenFileName() {
	return getFeTempOutputFolder() + "/module.tokens";
}

function getTokensFromTokenFile() {
	var lines;
	try {
		const fileName = getTokenFileName()
		lines = fs.readFileSync(fileName).toString();
	} catch (err) {
		console.error(err)
	}

	const ret = lines.split('Token').slice(1, -1);
	return ret;
}
function getTokenDataLine(text, documentText) {
	const start = Number(text.split('\n').slice(1, -2)[3].replace(/\s+/g, '').split(":")[1].replace(",", ""));

	const ret = getLineNumberFromCharPos(documentText, start);
	return ret;
}
function getTokenDataStartCharacter(text, documentText) {
	//nasty way to extract the data!!! you should change this
	const start = Number(text.split('\n').slice(1, -2)[3].replace(/\s+/g, '').split(":")[1].replace(",", ""));
	if (start == 0) return 0;
	const ret = documentText.slice(0, start).split('\n');
	if (ret.length == 1) return ret[0].length;
	return ret[ret.length - 1].length;
}
function getTokenDataLength(text) {
	//nasty way to extract the data!!! you should change this
	const start = Number(text.split('\n').slice(1, -2)[3].replace(/\s+/g, '').split(":")[1].replace(",", ""));
	const end = Number(text.split('\n').slice(1, -2)[4].replace(/\s+/g, '').split(":")[1].replace(",", ""));
	return end - start;
}
function getTokenDataTokenType(text) {
	const ret = text.split('\n').slice(1, -2)[0].replace(/\s+/g, '').split(":")[1].replace(",", "");
	return ret;
}
function getTokenDataTokenModifiers(text) {
	return [];
}
class DocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
	async provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SemanticTokens> {

		var moduleTokens = getTokensFromTokenFile();
		var builder = new vscode.SemanticTokensBuilder();
		moduleTokens.forEach((token) => {
			builder.push(
				getTokenDataLine(token, document.getText()),
				getTokenDataStartCharacter(token, document.getText()),
				getTokenDataLength(token),
				this._encodeTokenType(getTokenDataTokenType(token)),
				this._encodeTokenModifiers(getTokenDataTokenModifiers(token))

			);
		});
		return builder.build();
	}

	private _encodeTokenType(tokenType: string): number {
		if (tokenTypes.has(tokenType)) {
			return tokenTypes.get(tokenType)!;
		} else if (tokenType === 'notInLegend') {
			return tokenTypes.size + 2;
		}
		return 0;
	}

	private _encodeTokenModifiers(strTokenModifiers: string[]): number {
		let result = 0;
		for (let i = 0; i < strTokenModifiers.length; i++) {
			const tokenModifier = strTokenModifiers[i];
			if (tokenModifiers.has(tokenModifier)) {
				result = result | (1 << tokenModifiers.get(tokenModifier)!);
			} else if (tokenModifier === 'notInLegend') {
				result = result | (1 << tokenModifiers.size + 2);
			}
		}
		return result;
	}

	
}
