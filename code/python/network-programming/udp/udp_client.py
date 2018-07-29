#!/usr/bin/python3

from socket import *

HOST = 'localhost'
BUFSZ = 1024
PORT = 21568
ADDR = (HOST, PORT)

"""  tcp 客户端  """
udpCliSock = socket(AF_INET, SOCK_DGRAM)

while True:
    data = input('> ')
    if not data:
        break
    udpCliSock.sendto(bytes(data, 'utf-8'), ADDR)
    data, addr = udpCliSock.recvfrom(BUFSZ)
    if not data:
        break
    print(data.decode('utf-8'))
udpCliSock.close()
