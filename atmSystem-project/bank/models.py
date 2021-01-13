from django.db import models


class Atm(models.Model):
    atm_id = models.AutoField(primary_key=True)
    location = models.CharField(max_length=128)
    qty_note_1 = models.PositiveIntegerField(default=0)
    qty_note_2 = models.PositiveIntegerField(default=0)
    qty_note_5 = models.PositiveIntegerField(default=0)
    qty_note_10 = models.PositiveIntegerField(default=0)
    qty_note_20 = models.PositiveIntegerField(default=0)
    qty_note_50 = models.PositiveIntegerField(default=0)
    qty_note_100 = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.location


class Account(models.Model):
    account_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64)
    balance = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class TransactionType(models.Model):
    DEPOSIT = 1
    WITHDRAW = 2

    type_id = models.AutoField(primary_key=True)
    type_label = models.CharField(max_length=64)

    def __str__(self):
        return self.type_label


class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    transaction_type = models.ForeignKey(TransactionType, on_delete=models.PROTECT)
    amount = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.timestamp)
