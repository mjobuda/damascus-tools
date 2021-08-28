#!/usr/bin/env python

from prompt_toolkit import prompt
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from os.path import expanduser

from os import system
import sys

if len(sys.argv) == 1:
    nreplPort = '1667'
else:
    nreplPort = sys.argv[1]
system('bb nrepl-server '+nreplPort+' &')

myPromptSession = PromptSession(
    history=FileHistory(expanduser('~/.bbc_history')))

while True:
    userInput = myPromptSession.prompt('Enter command:\n')
    print("{}, interesting.".format(userInput))
