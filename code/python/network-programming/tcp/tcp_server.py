#!/usr/bin/python3

from socket import *
from time import ctime

HOST = ''
PORT = 21568
BUFSZ = 1024
ADDR = (HOST, PORT)

"""  tcp 服务端  """
tcpSerSock = socket(AF_INET, SOCK_STREAM)
tcpSerSock.bind(ADDR)
tcpSerSock.listen(5)

while True:
    print('warting for connection...')
    tcpCliSock, addr = tcpSerSock.accept()
    print('connected from: ', addr)
    while True:
        data = tcpCliSock.recv(BUFSZ)
        if not data:
            break
        tcpCliSock.send(bytes("[%s]%s" % ((ctime(), data.decode('utf-8'))), 'utf-8'))
    tcpCliSock.close()
tcpSerSock.close()
