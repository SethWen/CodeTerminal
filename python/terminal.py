# -*- coding: utf-8 -*-

"""
    author: Shawn
    time  : 2017/11/21 17:10
    desc  :     
"""

import subprocess
import sys


def execute(script):
    """
    execute script
    :param script: shell script on windows and bat  script on linux
    :return: execute result of the script
    """
    process = subprocess.Popen(script, stdout=subprocess.PIPE, shell=True)
    result = process.communicate()[0]
    print('execute --> result = ', result.strip())
    return result.strip()


def get_args_from_terminal():
    args = sys.argv  # all spaced args following python
    for arg in args:
        # todo extract args you need
        print('get_args_from_terminal --> arg = ', arg)


if __name__ == '__main__':
    # execute('echo("Hello World")')
    execute('phantomjs --load-images=false jingdong_login.js')
    # get_args_from_terminal()
