var dockerCLI = require("docker-cli-js");
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

var options = new DockerOptions();

var docker = new Docker(options);

docker.command("run berlinvege/fe -v").then(function (data) {
  console.log("data = ", data);
});
