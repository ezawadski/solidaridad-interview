from rest_framework import serializers

from ..models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    account = serializers.ReadOnlyField(source='account.name')
    transaction_type = serializers.ReadOnlyField(source='transaction_type.type_label')

    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = [
            'transaction_id',
            'timestamp',
        ]
