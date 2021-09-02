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
  console.log('XXXXXX');
  console.log(fileName);
  const fe_options =
    "--overwrite --emit=abi,bytecode";
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
  //The only reason I do this in TS is because I love Fe
  //Fe has the potential to become an awesome tech and I want to bring
  // it to the people
  // TypeScript is not a good language. It's not possible
  // to make good software with it. Period.
  //if you want types you can use Rust. Or something else.
  //but don't fall into the M$ trap. They don't design SW to be useful,
  // but to make money. That's not the same thing.
  // producing unmaintainable software can be good buisness.
  //
  //From now on I will use every workaround possible to get the job
  //done as fast as possible.
  // By definition this results in crappy code.
  // But as I finally understood it's not possible to produce good code with TS.
  // It's designed that way. That's it's purpose. To force the developer
  // to produce boilerplate. There is no other reason to use it.
  // If you think that the following is bad and it should be done by XYZ
  //then you felt into the M$ trap. 10 engineers after you will have to understand
  // XYZ and add their ABC to it. And the next 10 engineers will have to understand
  // XYZABC. And to fix bugs in it. And then to redesign it.
  // Besides: TS takes away the repl and the possibility to debug in your browser
  // If you want a language that is superior to JS but takes away some conveniences
  // you can use clojurescript. Oh yes, CJ has a repl. Even a few.
  // There are so many choices. Don't use TypeScript.
  var compilerResult: { [k: string]: any } = {};
  compilerResult.contracts = {};
  const FE_OUTPUT=fs.readdirSync('fe_output');
  for (const fileName of FE_OUTPUT)
    {

  compilerResult.contracts[fileName] = {};
  compilerResult.contracts[fileName].bytecode = fs.readFileSync('fe_output/'+fileName+'/'+fileName+'.bin');
    }
  compilerResult.contracts["Fooooooo"] = {};
  compilerResult.contracts["Fooooooo"].bytecode = "uttututu";
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
    console.log(
      "Fe compilerResult object... " +
        compilerResult.contracts["Fooooooo"].bytecode
    );
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
