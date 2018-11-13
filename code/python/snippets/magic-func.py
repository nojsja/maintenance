"""
  内部方法
"""


""" ------------------- 使用内部方法重载操作符  ------------------- """
class Money:
    currency_rates = {
        '$': 1,
        '￥': 6,
    }
    def __init__(self, symbol, amount):
        self.symbol = symbol
        self.amount = amount
    def __repr__(self):
        return '%s%.2f' % (self.symbol, self.amount)
    def convert(self, other):
        """ Convert other amount to our currency """
        new_amount = (
            other.amount / self.currency_rates[other.symbol]
            * self.currency_rates[self.symbol])
        return Money(self.symbol, new_amount)

    def __add__(self, other):
        """ Add 2 Money instances using '+' """
        new_amount = self.amount + self.convert(other).amount
        return Money(self.symbol, new_amount)


soda_cost = Money('$', 3.25);
pizza_cost = Money('￥', 15);

print ('soda_cost: ', soda_cost);
print ('pizza_cost: ', pizza_cost);
print ('soda_cost - pizza_cost = ', soda_cost + pizza_cost);


""" ------------------- 长度定义 方法 ------------------- """
class Alphabet:
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    def __len__(self):
        return len(self.letters)
my_alphabet = Alphabet()
len(my_alphabet)


""" ------------------- 神奇的函数属性 ------------------- """

"""
  别名功能，函数只是对象，可以赋值给多个变量
"""
def foo():
    return 'foo'

print(foo())
bar = foo
print(bar())

"""
  getattr用于获取对象的属性
"""
class Dog:
    sound = 'Bark'
    def speak(self):
        print(self.sound + '!', self.sound + '!')

fido = Dog()
print(fido.sound)
print(fido.speak)
print(getattr(fido, 'sound'))
print(getattr(fido, 'speak'))

class Operations:
    def say_hi(self, name):
        print('Hello,', name)
    def say_bye(self, name):
        print ('Goodbye,', name)
    def default(self, arg):
        print ('This operation is not supported.')
if __name__ == '__main__':
    operations = Operations()
    # 假设我们做了错误处理
    # command, argument = input('> ').split()
    command, argument = ['say_hi', 'Johnson']
    func_to_call = getattr(operations, command, operations.default)
    func_to_call(argument)

""" ------------------- partial返回新的函数对象 ------------------- """
from functools import partial
baseTwo = partial(int, base=2)
print(int)
print(baseTwo('10010'))
