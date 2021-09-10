#!/usr/bin/env python
# -*- coding: utf-8 -*-

from hissp.reader import Lissp
from hissp.compiler import readerless

def xx(ss):
    print(ss)
    ss=Lissp().reads(ss)
    print(ss)
    ss=next(ss)
    print(ss)
    ss=readerless(ss)
    print(ss)
    ss=eval(ss)
    print(ss)
