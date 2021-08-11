import docker
client = docker.from_env()

client.containers.run("ubuntu", "echo hello world")

  -v `pwd`:`pwd` -w `pwd`   ekovege/fe 
