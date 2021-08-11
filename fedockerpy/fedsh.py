import os

os.system('docker run  -v `pwd`:`pwd` -w `pwd`   ekovege/fe if_statement.fe')

def compile(commandOptions):
    return(os.system('docker run  -v `pwd`:`pwd` -w `pwd`   ekovege/fe '+commandOptions))
