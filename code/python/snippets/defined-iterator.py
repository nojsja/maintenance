"""
  自定义迭代器
"""


""" ------------------- iterator ------------------- """
class Server:

    def __init__(self):
        self.services = [
            {'active': False, 'protocol': 'ftp', 'port': 21},
            {'active': True, 'protocol': 'ssh', 'port': 22},
            {'active': True, 'protocol': 'http', 'port': 80},
        ]


class IterableServer(Server):

    def __init__(self):
        super().__init__()
        self.current_state = 0

    def __iter__(self):
        return self

    def __next__(self):
        while self.current_state < len(self.services):
            service = self.services[self.current_state]
            self.current_state += 1
            if service['active']:
                return service['protocol'], service['port']
        raise StopIteration

for protocol, port in IterableServer():
    print('service %s is running on port %d' % (protocol, port))


""" ------------------- generator ------------------- """
class GeneratorServer(Server):
    def __init__(self):
        super().__init__()
        self.current_state = 0

    def __iter__(self):
        while self.current_state < len(self.services):
            service = self.services[self.current_state]
            self.current_state += 1
            if service['active']:
                yield service['protocol'], service['port']
        raise StopIteration

for protocol, port in GeneratorServer():
    print('service %s is running on port %d' % (protocol, port))
