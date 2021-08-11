var dockerCLI = require("docker-cli-js");

function compile(options) {
  return dockerCLI
    .dockerCommand(
      "run  -v /home/mmm/github/damascus-tools/fedockerjs:/home/mmm/github/damascus-tools/fedockerjs -w /home/mmm/github/damascus-tools/fedockerjs   ekovege/fe ${ options }"
    )
    .then(function (data) {
      console.log("data = ", data);
    });
}

module.exports = compile;
