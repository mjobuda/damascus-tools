#!/usr/bin/env python
import subprocess
text = 'heXXXllo'
proc = subprocess.Popen(
    'md5sum', stdout=subprocess.PIPE,
    stdin=subprocess.PIPE)
proc.stdin.write(text.encode('utf-8'))
proc.stdin.close()
result = proc.stdout.read()
print(result)
#  proc.wait()
