from rest_framework import generics

from ..models import Transaction
from ..serializers import TransactionSerializer


class TransactionList(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(account_id=self.kwargs['account_id'])
