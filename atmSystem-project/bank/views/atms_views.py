from rest_framework import generics

from ..models import Atm
from ..serializers import AtmSerializer


class AtmListCreate(generics.ListCreateAPIView):
    queryset = Atm.objects.all()
    serializer_class = AtmSerializer


class AtmRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Atm.objects.all()
    serializer_class = AtmSerializer
