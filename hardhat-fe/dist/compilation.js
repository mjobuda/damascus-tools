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
function getFeCommand() {
    const fePath = fs
        .readFileSync(process.cwd() + "/fe_path_name", {
        encoding: "utf8",
        flag: "r",
    })
        .trim();
    console.log(fePath);
    console.log(process.cwd());
    return fePath;
}
function getFeTempOutputFolder() {
    return process.cwd() + "/fe_output";
}
function compileFileWithFeBinary(fileName) {
    console.log(fileName);
    const fe_options = "--overwrite --emit=abi,bytecode";
    const outputFolder = getFeTempOutputFolder();
    const rmCommand = "rm -rf " + outputFolder;
    if (fileName.endsWith(".git"))
        fileName = fileName.slice(0, -4);
    if (!fileName.endsWith(".fe"))
        return;
    const feCommand = getFeCommand() +
        " " +
        fileName +
        " " +
        fe_options +
        " " +
        "--output-dir " +
        outputFolder;
    console.log(rmCommand);
    const rmOutput = require("child_process").execSync(rmCommand).toString();
    try {
        console.log(feCommand);
        require("child_process").execSync(feCommand);
    }
    catch (e) {
        console.log("[Compiler Exception] " + e);
    }
}
function getCompileResultFromBinaryBuild() {
    //sorry. I'm done. I'm not playing the TypeScript game anymore
    //this technology is @@@. It's not possible to do good software with it
    //any attempt to do so is a waste of time.
    var compilerResult = {};
    compilerResult.contracts = {};
    const FE_OUTPUT = fs.readdirSync("fe_output");
    for (const fileName of FE_OUTPUT) {
        compilerResult.contracts[fileName] = {};
        compilerResult.contracts[fileName].bytecode = fs.readFileSync("fe_output/" + fileName + "/" + fileName + ".bin", "utf8");
        compilerResult.contracts[fileName].abi = fs.readFileSync("fe_output/" + fileName + "/" + fileName + "_abi.json", "utf8");
        compilerResult.contracts[fileName].abi = JSON.parse(compilerResult.contracts[fileName].abi);
    }
    return compilerResult;
}
async function compile(feConfig, paths, artifacts) {
    const feVersion = feConfig.version;
    console.log(feVersion);
    const useFeBinary = fs.existsSync("fe_path_name");
    console.log(useFeBinary);
    const files = await getFeSources(paths);
    console.log(files);
    let someContractFailed = false;
    for (const file of files) {
        const pathFromCWD = path_1.default.relative(process.cwd(), file);
        const pathFromSources = path_1.default.relative(paths.sources, file);
        console.log("Compiling with Fe...");
        const sourceName = await source_names_1.localPathToSourceName(paths.root, file);
        const feSourceCode = fs.readFileSync(file, "utf8");
        console.log(feSourceCode);
        var compilerResult;
        if (useFeBinary) {
            console.log("Compiling with FeBinary...");
            compileFileWithFeBinary(file);
            compilerResult = getCompileResultFromBinaryBuild();
        }
        else {
            console.log("Compiling with Fejs...");
            compilerResult = fejs.compile(feSourceCode);
        }
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
    console.log("...hex...");
    console.log(hex);
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