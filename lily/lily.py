#!/usr/bin/env python
# -*- coding: utf-8 -*-


from prompt_toolkit.filters import ViInsertMode
from prompt_toolkit.key_binding.key_processor import KeyPress
from prompt_toolkit.keys import Keys
from prompt_toolkit.styles import Style

import ptpython
from ptpython.layout import CompletionVisualisation
__all__ = ["configure"]
from ptconfig import *
import ptpython
import ptpython.repl

from hissp.reader import Lissp, SoftSyntaxError
import hissp.basic
import hissp.repl 
from types import ModuleType, SimpleNamespace
        
from pygments.lexers import PythonLexer, PythonTracebackLexer
from pygments import highlight
from pygments.formatters import TerminalTrueColorFormatter

from lex import LisspReplLexer
import sys

def xprint(expression,prompt=">>> ", newline="... ",lexer=LisspReplLexer,formatter=TerminalTrueColorFormatter):
    print(highlight(prompt+expression.replace("\n", "\n"+newline),lexer(), formatter()))


#  locals()["_macro_"] = SimpleNamespace(**vars(hissp.basic._macro_))
__main__ = ModuleType("__main__")
sys.modules["__main__"] = __main__
#  lissp = Lissp(ns=__main__.__dict__)
#  lissp.locals["_macro_"] = SimpleNamespace(**vars(hissp.basic._macro_))
oldRepl = hissp.repl.LisspREPL()
#  oldRepl.lissp.filename="<input>"
lissp = oldRepl.lissp
lissp.locals["_macro_"] = SimpleNamespace(**vars(hissp.basic._macro_))
def newEval(self,expression):
    try:
        expression = lissp.compile(expression)
    except SoftSyntaxError:
        xprint('no! SoftSyntaxError\n')
        return True
    except SyntaxError:
        xprint('no! SyntaxError\n')
        import traceback
        xprint("lil' traceback:\n"+'\n'.join( traceback.format_exc().split('hissp.compiler.CompileError:')[1:]))
        return False
    except BaseException:
        xprint('no! BaseException\n')
        import traceback
        xprint("lil' traceback:\n"+'\n'.join( traceback.format_exc().split('\n')[3:]))
        return False
    xprint(expression)
    result = None
    try:
        result = self.eval(expression)
    except Exception as EEE:
        print('no! no,no\n')
        import traceback
        xprint("lil' traceback:\n"+'\n'.join( traceback.format_exc().split('\n')[5:]))
    if result is not None:
        # Print.
        self.show_result(result)
    # Loop.
    self.current_statement_index += 1
    self.signatures = []

def run():
    ptpython.repl.PythonRepl.run_and_show_expression = newEval
    ptpython.repl.embed(globals(), locals(),configure=configure,history_filename='.lily_history')

if __name__ == "__main__":
    run()
