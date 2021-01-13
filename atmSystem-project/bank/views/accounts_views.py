from rest_framework import generics

from ..models import Account, Transaction, TransactionType
from ..serializers import AccountSerializer


class AccountListCreate(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def perform_update(self, serializer):
        account = self.get_object()
        old_balance = account.balance
        print(old_balance)
        new_balance = self.request.data['balance']
        print(new_balance)
        difference = new_balance - old_balance
        if difference != 0:
            Transaction.objects.create(
                account=account,
                transaction_type_id=TransactionType.DEPOSIT if difference > 0 else TransactionType.WITHDRAW,
                amount=difference,
            )
            serializer.save()
