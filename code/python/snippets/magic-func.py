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
