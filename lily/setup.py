#!/usr/bin/env python
# -*- coding: utf-8 -*-


from setuptools import setup, find_packages

setup(
    name='lily',
    version='0.8.0',
    url='https://github.com/mjobuda/damascus-tools',
    author='Marek Owsikowski',
    author_email='owsikowski@gmail.com',
    description='lil repl for a lissp',
    packages=find_packages(),    
    install_requires=['ptpython >= 3.0.0', 'hissp'],
    entry_points={
        'console_scripts': ['lily=lily:run']
    }
)
