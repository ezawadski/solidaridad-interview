from django.contrib import admin

from .models import *

admin.site.register(TransactionType)
admin.site.register(Atm)
admin.site.register(Account)
admin.site.register(Transaction)
