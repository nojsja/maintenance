#!/usr/bin/python3

from socket import *

HOST = 'localhost'
BUFSZ = 1024
PORT = 21568
ADDR = (HOST, PORT)

"""  tcp 客户端  """
tcpCliSock = socket(AF_INET, SOCK_STREAM)
tcpCliSock.connect(ADDR)

while True:
    data = input('> ')
    if not data:
        break
    tcpCliSock.send(bytes(data, 'utf-8'))
    data = tcpCliSock.recv(BUFSZ)
    print(data.decode('utf-8'))
tcpCliSock.close()
