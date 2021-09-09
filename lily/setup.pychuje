#!/usr/bin/env python
# -*- coding: utf-8 -*-

#!/usr/bin/env python
import os
import sys

#who invented this bullshit??
#python is such a nice language,
#how could it happen that such a disgusting
# completele unnecessary and bloated pile 
# of garbage could become a setup tool?
#I spent a few hours on this ceremony
#what for?? 
#a complete waste of time


from setuptools import find_packages, setup

#  with open(os.path.join(os.path.dirname(__file__), "README.rst")) as f:
    #  long_description = f.read()


setup(
    name="lily",
    author="Marek Owsikowski",
    version="1.0.0",
    url="https://github.com/mjobuda/damascus-tools/tree/main/lily",
    description="Lissp REPL. Based on ptpython",
    install_requires=[
        "ptpython",
        "hissp"
    ],
    python_requires=">=3.6",
    packages=find_packages(),
    #  package_dir={"": "src"},
    entry_points={
        "console_scripts": [
            "lily = lily:run"
        ]
    })

