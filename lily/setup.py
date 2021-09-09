#!/usr/bin/env python
# -*- coding: utf-8 -*-

#!/usr/bin/env python
import os
import sys

from setuptools import find_packages, setup

#  with open(os.path.join(os.path.dirname(__file__), "README.rst")) as f:
    #  long_description = f.read()


setup(
    name="lily",
    author="Marek Owsikowski",
    version="1.0.0",
    url="https://github.com/mjobuda/damascus-tools/tree/main/lily",
    description="Lissp REPL. Based on ptpython",
    long_description=long_description,
    install_requires=[
        ptpython,
        hissp
    ],
    python_requires=">=3.6",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    entry_points={
        "console_scripts": [
            "lily = src.lily.run"
        ]
    })

