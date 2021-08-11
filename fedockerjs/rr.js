var dockerCLI = require("docker-cli-js");
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

var options = new DockerOptions(
  /* machinename */ "aws_machine01",
  /* currentWorkingDirectory */ "nginx",
  /* echo */ true
);

var docker = new Docker(options);

docker.command("build -t nginximg .").then(function (data) {
  console.log("data = ", data);
});
