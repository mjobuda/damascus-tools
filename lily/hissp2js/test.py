#!/usr/bin/env python
# -*- coding: utf-8 -*-

from hissp.compiler import readerless
from hissp.reader import Lissp
import jiphy

src = """(setv ttt (lambda (name)(print 'Hello name)))"""

py_src = readerless(next(Lissp().reads(src)))

print(py_src)

js_src = jiphy.to.javascript(py_src)

print(js_src)
