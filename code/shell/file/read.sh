#!/bin/bash

read -p 'Please input a word: ' x
if [ $x -lt 5 ]; then
  echo 'x < 5'
elif [ $x -gt 5 ]; then
  echo 'x > 5'
fi

if [[ $x = 5 ]]; then
  echo 'x = 5'
fi
