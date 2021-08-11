import os


def compile(commandOptions):
    return(os.system('docker run  -v `pwd`:`pwd` -w `pwd`   ekovege/fe '+commandOptions))
