#!/bin/bash

fsymble='>>> '

## blue to echo
function blue(){
  echo -e $fsymble"\033[34m$1\033[40m"
}

## blue highlight
function highlight_blue() {
  echo -e $fsymble"\033[34m\033[47m$1\033[0m"
}

## green to echo
function green(){
  echo -e $fsymble"\033[32m$1\033[0m"
}

## error info with underline
function under_red(){
  echo -e $fsymble"\033[31m\033[01m\033[04m$1\033[0m"
}

## error info
function red(){
  echo -e $fsymble"\033[31m\033[01m$1\033[0m"
}

## warning info
function yellow(){
  echo -e $fsymble"\033[33m\033[01m$1\033[0m"
}

## warning info with underLine
function under_yellow(){
  echo -e $fsymble"\033[33m\033[01m\033[04m$1\033[0m"
}

blue 'blue'
highlight_blue "hlblue"
green 'green'
under_red 'under_red'
red 'red'
yellow 'yellow'
under_yellow 'under_yellow'
