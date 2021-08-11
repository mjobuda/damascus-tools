var dockerCLI = require("docker-cli-js");
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

var options = new DockerOptions();

var docker = new Docker(options);
function compile(commandLine) {
  docker
    .command("run  -v `pwd`:`pwd` -w `pwd`   ekovege/fe " + commandLine)
    .then(function (data) {
      console.log("data = ", data);
    });
}

module.exports = compile;
