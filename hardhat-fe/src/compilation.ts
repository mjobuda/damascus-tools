import fsExtra from "fs-extra";
import { NomicLabsHardhatPluginError } from "hardhat/plugins";
import { Artifact, Artifacts, ProjectPathsConfig } from "hardhat/types";
import { localPathToSourceName } from "hardhat/utils/source-names";
import path from "path";
var fejs = require("@berlinvege/fejs");
import * as fs from "fs";
import { FeConfig } from "./types";

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

function compileFileWithFeBinary(fileName: string) {
  console.log(fileName);
  const fe_options = "--overwrite --emit=abi,bytecode";
  const outputFolder = getFeTempOutputFolder();
  const rmCommand = "rm -rf " + outputFolder;
  if (fileName.endsWith(".git")) fileName = fileName.slice(0, -4);
  if (!fileName.endsWith(".fe")) return;
  const feCommand =
    getFeCommand() +
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
  } catch (e) {
    console.log("[Compiler Exception] " + e);
  }
}

function getCompileResultFromBinaryBuild() {
  //sorry. I'm done. I'm not playing the TypeScript game anymore
  //this technology is @@@. It's not possible to do good software with it
  //any attempt to do so is a waste of time.
  var compilerResult: { [k: string]: any } = {};
  compilerResult.contracts = {};
  const FE_OUTPUT = fs.readdirSync("fe_output");
  for (const fileName of FE_OUTPUT) {
    compilerResult.contracts[fileName] = {};
    compilerResult.contracts[fileName].bytecode = fs.readFileSync(
      "fe_output/" + fileName + "/" + fileName + ".bin",
      "utf8"
    );
    compilerResult.contracts[fileName].abi = fs.readFileSync(
      "fe_output/" + fileName + "/" + fileName + "_abi.json",
      "utf8"
    );
    compilerResult.contracts[fileName].abi = JSON.parse(compilerResult.contracts[fileName].abi);
  }
  return compilerResult;
}

export async function compile(
  feConfig: FeConfig,
  paths: ProjectPathsConfig,
  artifacts: Artifacts
) {
  const feVersion = feConfig.version;
  console.log(feVersion);
  const useFeBinary = fs.existsSync("fe_path_name");
  console.log(useFeBinary);

  const files = await getFeSources(paths);
  console.log(files);

  let someContractFailed = false;

  for (const file of files) {
    const pathFromCWD = path.relative(process.cwd(), file);
    const pathFromSources = path.relative(paths.sources, file);
    console.log("Compiling with Fe...");

    const sourceName = await localPathToSourceName(paths.root, file);
    const feSourceCode = fs.readFileSync(file, "utf8");
    console.log(feSourceCode);
    var compilerResult;
    if (useFeBinary) {
      console.log("Compiling with FeBinary...");
      compileFileWithFeBinary(file);
      compilerResult = getCompileResultFromBinaryBuild();
    } else {
      console.log("Compiling with Fejs...");
      compilerResult = fejs.compile(feSourceCode);
    }
    for (const key of Object.keys(compilerResult.contracts)) {
      const artifact = getArtifactFromFeOutput(
        sourceName,
        key,
        compilerResult.contracts[key]
      );
      await artifacts.saveArtifactAndDebugFile(artifact);
    }
  }

  if (someContractFailed) {
    throw new NomicLabsHardhatPluginError(
      "@berlinvege/hardhat-fe",
      "Compilation failed"
    );
  }

  //await saveLastFeVersionUsed(feVersion, paths);
}

async function getFeSources(paths: ProjectPathsConfig) {
  const glob = await import("glob");
  const feFiles = glob.sync(path.join(paths.sources, "**", "*.fe"));

  return feFiles;
}

function pathToContractName(file: string) {
  const sourceName = path.basename(file);
  return sourceName.substring(0, sourceName.indexOf("."));
}

function getArtifactFromFeOutput(
  sourceName: string,
  contractName: string,
  output: any
): Artifact {
  //const contractName = pathToContractName(sourceName);

  return {
    _format: ARTIFACT_FORMAT_VERSION,
    contractName,
    sourceName,
    abi: output.abi,
    bytecode: add0xPrefixIfNecessary(output.bytecode),
    deployedBytecode: "", //add0xPrefixIfNecessary(output.bytecode_runtime),
    linkReferences: {},
    deployedLinkReferences: {},
  };
}

function add0xPrefixIfNecessary(hex: string): string {
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
