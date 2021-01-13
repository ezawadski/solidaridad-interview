from rest_framework import serializers

from ..models import Atm
from ..utils import calc_balance


class AtmSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()

    class Meta:
        model = Atm
        fields = '__all__'
        read_only_fields = [
            'atm_id',
        ]

    @staticmethod
    def get_balance(self):
        return calc_balance(self)
