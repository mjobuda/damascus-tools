"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
const plugins_1 = require("hardhat/plugins");
const source_names_1 = require("hardhat/utils/source-names");
const path_1 = __importDefault(require("path"));
var fejs = require("@berlinvege/fejs");
const fs = __importStar(require("fs"));
const ARTIFACT_FORMAT_VERSION = "hh-fe-artifact-1";
function compileFileWithFeBinary(feBinaryPath, source) { }
async function compile(feConfig, paths, artifacts) {
    const feVersion = feConfig.version;
    const files = await getFeSources(paths);
    //console.log(paths);
    //console.log(files);
    let someContractFailed = false;
    for (const file of files) {
        const pathFromCWD = path_1.default.relative(process.cwd(), file);
        const pathFromSources = path_1.default.relative(paths.sources, file);
        console.log("Compiling with Fe...");
        const sourceName = await source_names_1.localPathToSourceName(paths.root, file);
        const feSourceCode = fs.readFileSync(file, "utf8");
        console.log(feSourceCode);
        const compilerResult = fejs.compile(feSourceCode);
        console.log("Fe compilerResult object... " + compilerResult.contracts["Foo"].bytecode);
        for (const key of Object.keys(compilerResult.contracts)) {
            const artifact = getArtifactFromFeOutput(sourceName, key, compilerResult.contracts[key]);
            await artifacts.saveArtifactAndDebugFile(artifact);
        }
    }
    if (someContractFailed) {
        throw new plugins_1.NomicLabsHardhatPluginError("@berlinvege/hardhat-fe", "Compilation failed");
    }
    //await saveLastFeVersionUsed(feVersion, paths);
}
exports.compile = compile;
async function getFeSources(paths) {
    const glob = await Promise.resolve().then(() => __importStar(require("glob")));
    const feFiles = glob.sync(path_1.default.join(paths.sources, "**", "*.fe"));
    return feFiles;
}
function pathToContractName(file) {
    const sourceName = path_1.default.basename(file);
    return sourceName.substring(0, sourceName.indexOf("."));
}
function getArtifactFromFeOutput(sourceName, contractName, output) {
    //const contractName = pathToContractName(sourceName);
    return {
        _format: ARTIFACT_FORMAT_VERSION,
        contractName,
        sourceName,
        abi: output.abi,
        bytecode: add0xPrefixIfNecessary(output.bytecode),
        deployedBytecode: "",
        linkReferences: {},
        deployedLinkReferences: {},
    };
}
function add0xPrefixIfNecessary(hex) {
    hex = hex.toLowerCase();
    if (hex.slice(0, 2) === "0x") {
        return hex;
    }
    return `0x${hex}`;
}
/*
async function getLastFeVersionUsed(paths: ProjectPathsConfig) {
  const filePath = path.join(paths.cache, LAST_FE_VERSION_USED_FILENAME);
  if (!(await fsExtra.pathExists(filePath))) {
    return undefined;
  }

  return fsExtra.readFile(filePath, "utf8");
}

async function saveLastFeVersionUsed(
  version: string,
  paths: ProjectPathsConfig
) {
  const filePath = path.join(paths.cache, LAST_FE_VERSION_USED_FILENAME);
  await fsExtra.ensureDir(path.dirname(filePath));
  return fsExtra.writeFile(filePath, version, "utf8");
}
*/
//# sourceMappingURL=compilation.js.map