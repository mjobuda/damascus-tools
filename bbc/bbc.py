from prompt_toolkit import prompt
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from os.path import expanduser

from os import system
import sys

nreplPort = sys.argv[1]
system('bb nrepl-server '+nreplPort

myPromptSession=PromptSession(
    history=FileHistory(expanduser('~/.bbc_history')))

while True:
    userInput=myPromptSession.prompt('Enter command:\n')
    print("{}, interesting.".format(userInput))
