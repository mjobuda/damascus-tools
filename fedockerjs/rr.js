// esm
const { dockerCommand } = require("docker-cli-js");

// default options
const options = {
  machineName: null, // uses local docker
  currentWorkingDirectory: null, // uses current working directory
  echo: true, // echo command output to stdout/stderr
};

const data = await dockerCommand("run hello-world", options);
