#!/usr/bin/env python
import subprocess
text = 'hello'
proc = subprocess.Popen(
    'md5sum', stdout=subprocess.PIPE,
    stdin=subprocess.PIPE)
proc.stdin.write(text)
proc.stdin.close()
result = proc.stdout.read()
print result
proc.wait()
