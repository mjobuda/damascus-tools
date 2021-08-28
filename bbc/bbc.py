from prompt_toolkit import prompt
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from os.path import expanduser

from os import system

system('bb nrepl-server')
nreplPort = 1667  # todo

myPromptSession = PromptSession(
    history=FileHistory(expanduser('~/.bbc_history')))

while True:
    userInput = myPromptSession.prompt('Enter command:\n')
    print("{}, interesting.".format(userInput))
