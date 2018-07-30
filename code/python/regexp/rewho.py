import re

# Python
f = open('file/who.txt', 'r')
for value in f:
    print(re.split(r'\s\s+|\t', value.rstrip()))
f.close()

# Python3
import os

with os.popen('file/who.txt', 'r') as f2:
    for value in f2:
        print( re.split(r'\s\s+|\t', value.strip()) )
