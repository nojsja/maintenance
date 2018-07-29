#!/usr/bin/python3

from socket import *
from time import ctime

HOST = ''
PORT = 21568
BUFSZ = 1024
ADDR = (HOST, PORT)

"""  udp 服务端  """
udpSerSock = socket(AF_INET, SOCK_DGRAM)
udpSerSock.bind(ADDR)

while True:
    print('warting for message...')
    data, addr = udpSerSock.recvfrom(BUFSZ)
    udpSerSock.sendto(bytes("[%s]%s" % ((ctime(), data.decode('utf-8'))), 'utf-8'), ADDR)
    print('connected from and return to: ', addr)
udpSerSock.close()
