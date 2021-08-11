var dockerCLI = require("docker-cli-js");
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

var options = new DockerOptions();

var docker = new Docker(options);

docker.command("run hello-world").then(function (data) {
  console.log("data = ", data);
});
