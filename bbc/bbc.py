from prompt_toolkit import prompt
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from os.path import expanduser

myPromptSession = PromptSession(
    history=FileHistory(expanduser('~/.myhistory')))

while True:
    userInput = myPromptSession.prompt('Enter command')
    print("{}, interesting.".format(userInput))
